import ResultsClient from './results-client';

export default function ResultsPage({ params }: { params: { id: string } }) {
  return <ResultsClient params={params} />;
}