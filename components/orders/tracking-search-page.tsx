"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function TrackingSearchPage({
  defaultValue = "",
  showNotFound = false
}: {
  defaultValue?: string;
  showNotFound?: boolean;
}) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const token = value.trim();
    if (!token) {
      return;
    }

    router.push(`/track/${encodeURIComponent(token)}`);
  }

  return (
    <section className="pb-10">
      <div className="border-b border-border bg-white">
        <div className="bg-[linear-gradient(90deg,#dff4ff_0%,#f1ffb4_50%,#ffe7cb_100%)]">
          <div className="container py-14 md:py-16">
            <div className="mx-auto max-w-[560px] text-center">
              <h1 className="text-4xl font-bold text-[#0f172a] md:text-[32px]">
                Track your order
              </h1>
              <p className="mt-3 text-sm text-slate-600">
                Order করার পরে যে tracking number বা tracking link পেয়েছেন, সেটা এখানে দিন।
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-8 flex overflow-hidden rounded-md border-2 border-[#454545] bg-white"
              >
                <input
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  placeholder="Input tracking number or token"
                  className="h-14 flex-1 px-4 text-lg font-medium outline-none placeholder:text-[#707070]"
                />
                <button
                  type="submit"
                  className="inline-flex h-14 items-center justify-center bg-[#3f3f46] px-6 text-lg font-medium text-white"
                >
                  Track order
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {showNotFound ? (
        <div className="container py-12">
          <div className="rounded-md bg-white py-10 text-center">
            <h2 className="text-5xl font-bold text-[#0f172a] md:text-[28px]">
              No Order Found
            </h2>
          </div>
        </div>
      ) : null}
    </section>
  );
}
