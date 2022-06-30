import { FC, useState } from "react";

import Layout from "../Layout/Layout";
import DocumentForm from "../DocumentForm/DocumentForm";
import Modal from "../Modal/Modal";

const App: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Layout>
        <DocumentForm openModal={() => setIsModalOpen(true)} />
      </Layout>
      {isModalOpen && <Modal />}
    </>
  );
};

export default App;
