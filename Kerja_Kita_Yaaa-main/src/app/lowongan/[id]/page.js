import { notFound } from "next/navigation";
import JobDetailClient from "../../../components/JobDetailClient";
import { jobs } from "../../../lib/demo-data";

export function generateStaticParams() {
  return jobs.map((job) => ({ id: job.id }));
}

export default async function JobDetailPage({ params }) {
  const { id } = await params;
  const job = jobs.find((item) => item.id === id);
  if (!job) notFound();
  return <JobDetailClient job={job} />;
}
