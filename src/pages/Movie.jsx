import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SearchMovie from "../components/movies/SearchMovie";
import GroupList from "../components/movies/GroupList";

const tabs = [
    { id: "listMovies", label: "Lista" },
    { id: "search", label: "Buscar" },
];

function Movie() {

  const [activeTab, setActiveTab] = useState("listMovies");

  return (
    <div className="">

      <div className="flex gap-1 border-b border-border pb-2">
        {tabs.map((tab) => (
            <Button
            key={tab.id}
            variant="club"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
                "border-b-2",
                activeTab === tab.id && "border-b-primary text-primary"
            )}
            >
            {tab.label}
            </Button>
        ))}
      </div>

      <div className="mt-5">
        {activeTab === "search" && <SearchMovie />}
        {activeTab === "listMovies" && <GroupList />}
      </div>

    </div>
  );
}

export default Movie;