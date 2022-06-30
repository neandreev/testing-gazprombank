import { FC } from "react";
import { useAdditionalInfo, useDocs, useLicenses, useRegistration } from "../../context";
import Layout from "../Layout/Layout";

const App: FC = () => {
  const docs = useDocs();
  const registration = useRegistration();
  const licenses = useLicenses();
  const additionalInfo = useAdditionalInfo();

  return <Layout>
    {JSON.stringify(docs)}
    {JSON.stringify(registration)}
    {JSON.stringify(licenses)}
    {JSON.stringify(additionalInfo)}
  </Layout>;
};

export default App;
