// CommonJS entry point - patches SlowBuffer before jsonwebtoken loads
// This fixes Node.js 25+ which removed SlowBuffer

if (typeof Buffer !== 'undefined' && !Buffer.SlowBuffer) {
  Buffer.SlowBuffer = Buffer;
  console.log('[polyfill] Patched Buffer.SlowBuffer for Node.js 25+');
}

// Now dynamically import the compiled ES module server
import('./dist/server.js').catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
