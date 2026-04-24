// Polyfill for Node.js 25+ which removed SlowBuffer
// This is needed by jsonwebtoken -> jwa -> buffer-equal-constant-time
if (typeof Buffer !== 'undefined' && !Buffer.SlowBuffer) {
  Buffer.SlowBuffer = Buffer;
}
