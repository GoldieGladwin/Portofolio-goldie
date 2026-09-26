import Link from 'next/link';
import { FolderOpen, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <main
      data-hide-nav="true"
      data-page="not-found"
      className="min-h-screen flex items-center justify-center px-4 py-20 bg-gray-100 dark:bg-gray-900"
    >
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl bg-white/80 dark:bg-gray-800/80 border border-gray-200/80 dark:border-gray-700 shadow-xl backdrop-blur-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/50 shadow-inner">
          <span className="text-4xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
            404
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Page / Project Not Found
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The project ID or URL you requested is not available in this portfolio.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/#projects"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md transition-all hover:scale-105"
          >
            <FolderOpen className="w-4 h-4" />
            Back to Projects
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 text-sm font-semibold transition-all hover:scale-105"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
