import { FC } from "react";
import { Field } from "react-final-form";

import SliderInput from "../SliderInput/SliderInput";

import styles from "./Poll.module.scss";

const AdditionalInfoForm: FC = () => {
  return (
    <div className={styles.toggles}>
      <div className={styles.toggle}>
        <h3 className={styles["toggle-label"]}>
          Предоставление услуг с использованием сайта в сети Интернет
        </h3>
        <Field
          name="isProvidingInternet"
          component={SliderInput}
          type="checkbox"
        />
      </div>
      <div className={styles.toggle}>
        <h3 className={styles["toggle-label"]}>
          Статус публичного должностного лица (ПДЛ)
        </h3>
        <Field
          name="isPublicOfficial"
          component={SliderInput}
          type="checkbox"
        />
      </div>
      <div className={styles.toggle}>
        <h3 className={styles["toggle-label"]}>Наличие выгодоприобретателей</h3>
        <Field
          name="haveBeneficiaries"
          component={SliderInput}
          type="checkbox"
        />
      </div>
      <div className={styles.toggle}>
        <h3 className={styles["toggle-label"]}>Наличие представителей</h3>
        <Field
          name="haveRepresentatives"
          component={SliderInput}
          type="checkbox"
        />
      </div>
      <div className={styles.toggle}>
        <h3 className={styles["toggle-label"]}>
          Наличие бенефициарного владельца
        </h3>
        <Field
          name="haveBeneficialOwner"
          component={SliderInput}
          type="checkbox"
        />
      </div>
    </div>
  );
};

export default AdditionalInfoForm;
