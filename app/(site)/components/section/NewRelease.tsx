import CollectionModal from "../modal/collectionModal";

const NewRelease = ({ newRelease }: any) => {
  return <CollectionModal title={"New Release"} category={newRelease} />;
};

export default NewRelease;
