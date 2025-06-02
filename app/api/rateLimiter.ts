// // lib/rateLimiter.ts
// import { RateLimiterRedis, RateLimiterMemory } from 'rate-limiter-flexible';
// import Redis from 'ioredis';

// // Initialize Redis client (falls back to memory if Redis unavailable)
// let redisClient: Redis | null = null;
// let limiter: RateLimiterRedis | RateLimiterMemory;

// if (process.env.REDIS_URL) {
//   redisClient = new Redis(process.env.REDIS_URL, {
//     enableOfflineQueue: false,
//     connectTimeout: 5000,
//   });

//   redisClient.on('error', (err) => {
//     console.error('Redis error:', err);
//     // Fallback to memory if Redis fails
//     if (!(limiter instanceof RateLimiterMemory)) {
//       limiter = createMemoryLimiter();
//     }
//   });

//   limiter = new RateLimiterRedis({
//     storeClient: redisClient,
//     points: 5, // Number of requests
//     duration: 60, // Per 60 seconds
//     keyPrefix: 'rl_', // Redis key prefix
//     insuranceLimiter: createMemoryLimiter(), // Fallback when Redis down
//   });
// } else {
//   limiter = createMemoryLimiter();
// }

// function createMemoryLimiter() {
//   return new RateLimiterMemory({
//     points: 5,
//     duration: 60,
//   });
// }

// // Unified rate limit check
// export async function checkRateLimit(
//   identifier: string,
//   points: number = 1
// ): Promise<{
//   allowed: boolean;
//   remainingPoints: number;
//   msBeforeNext: number;
// }> {
//   try {
//     const res = await limiter.consume(identifier, points);
//     return {
//       allowed: true,
//       remainingPoints: res.remainingPoints,
//       msBeforeNext: res.msBeforeNext,
//     };
//   } catch (res) {
//     return {
//       allowed: false,
//       remainingPoints: 0,
//       msBeforeNext: res.msBeforeNext,
//     };
//   }
// }

// // Endpoint-specific limiters (TypeScript safe)
// export const authLimiters = {
//   login: {
//     points: 5,
//     duration: 60,
//     keyPrefix: 'login_',
//   },
//   register: {
//     points: 3,
//     duration: 3600,
//     keyPrefix: 'register_',
//   },
//   passwordReset: {
//     points: 2,
//     duration: 86400,
//     keyPrefix: 'pwd_reset_',
//   },
// } as const;

// // Utility for Next.js API routes
// export async function applyRateLimit(
//   req: Request,
//   limiterConfig: typeof authLimiters[keyof typeof authLimiters]
// ) {
//   const ip =
//     req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
//     '127.0.0.1';
//   const key = `${limiterConfig.keyPrefix}${ip}`;

//   const { allowed, msBeforeNext } = await checkRateLimit(
//     key,
//     limiterConfig.points
//   );

//   if (!allowed) {
//     return {
//       error: new Response('Too many requests', {
//         status: 429,
//         headers: {
//           'Retry-After': Math.ceil(msBeforeNext / 1000).toString(),
//         },
//       }),
//     };
//   }

//   return { success: true };
// }