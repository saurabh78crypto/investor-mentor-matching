import DataCard from "../components/DataCard";
import Header from "../components/Header";
import SearchBox from "../components/SearchBox";

const Dashboard = () => {
  return (
    <div className="h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-2xl font-bold mb-4">Find Investors & Mentors</h1>
        <SearchBox />
        <DataCard />
      </div>
    </div>
  );
};

export default Dashboard;
