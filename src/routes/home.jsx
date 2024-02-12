import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="mx-auto max-w-5xl py-12 md:py-24 lg:py-32">
      <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center md:gap-10 md:px-6">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Welcome to DApp
          </h1>
          <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            A decentralized application for submitting transactions to the
            Ethereum blockchain.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            to="/transactions"
          >
            New Transaction
          </Link>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md text-white bg-gray-800 border border-gray-200 px-8 text-sm font-medium shadow-sm"
            to="/data"
          >
            View Transactions
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
