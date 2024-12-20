import { useState } from "react";
import RightSideBar from "./RightSideBar";
import GellaryItems from "./GellaryItems";
import LeftSideBar from "./LeftSideBar";
import Footer from "./Footer";

function MeinSection() {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <>
      <section className="bg-gray-900 dark:bg-white mt-16">
        <div className="max-w-[1420px] mx-auto text-white">
          <div className="bg-gray-800 dark:bg-white p-4 sm:p-8 rounded-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">

              {/* Left Sidebar - 2 columns on medium screens */}
              <div className="col-span-12 md:col-span-2">
                <LeftSideBar

                  onFilterChange={handleFilterChange}

                />
              </div>

              {/* Gallery Items - 8 columns on medium screens */}
              <div className="col-span-12 md:col-span-8">
                <GellaryItems

                  filter={filter}

                />
              </div>

              {/* Right Sidebar - 2 columns on medium screens */}
              <div className="col-span-12 md:col-span-2">
                <RightSideBar onFilterChange={handleFilterChange} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default MeinSection;
