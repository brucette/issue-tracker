import dynamic from "next/dynamic";
import IssueFormSkeleton from "../_components/IssueFormSkeleton";

//import IssueForm from "../_components/IssueForm";

// render dynamically and not on server,
// since the form/simplemde involves client interaction and access to the navigator API
// it will cause an error when next tries to initially render it on the server
const IssueForm = dynamic(
  () => import('../_components/IssueForm'), 
  { 
    ssr: false,
    loading: () => <IssueFormSkeleton />
  }
)

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
