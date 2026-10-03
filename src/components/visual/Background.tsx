const Background = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Pola Grid CSS Murni (0% beban JS & GPU) */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Radial Mask agar grid memudar anggun di sisi-sisi tepi */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/70 dark:to-gray-950/70" />

      {/* Cahaya Ambient Halus di Belakang Judul Hero */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[300px] sm:h-[420px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[200px] sm:w-[350px] h-[200px] sm:h-[350px] bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-[90px] pointer-events-none" />
    </div>
  );
};

export default Background;
