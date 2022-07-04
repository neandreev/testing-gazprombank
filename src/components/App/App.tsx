import { FC, useState } from "react";

import Layout from "../Layout/Layout";
import Form from "../Form/Form";
import Modal from "../Modal/Modal";

const App: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Layout>
        <Form openModal={() => setIsModalOpen(true)} />
      </Layout>
      {isModalOpen && <Modal />}
    </>
  );
};

export default App;
