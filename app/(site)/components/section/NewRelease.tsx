import CollectionModal from "../modal/collectionModal";

const NewRelease = ({ newRelease }: any) => {
  return (
    <div>
      <CollectionModal title={"New Release"} category={newRelease} />
    </div>
  );
};

export default NewRelease;
