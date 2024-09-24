
import Hero from "@/components/Home/Hero"
import WebHostingPlan from "@/components/Home/WebHostingPlan"

const page = () => {
  return (
    <section className="bg-purple-50">
      <Hero />
      <h2 className="text-center mt-10 text-3xl text-gray-500 font-bold">
        Choose Your Web Hosting Plan
      </h2>
      <div className=" container m-auto flex justify-center items-center my-7 flex-wrap md:gap-7 ">
        <WebHostingPlan />
        <WebHostingPlan />
        <WebHostingPlan />
      </div>
    </section>
  )
}

export default page

