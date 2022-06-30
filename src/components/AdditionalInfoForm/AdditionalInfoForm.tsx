import { FC } from "react";
import { Field } from "react-final-form";
import ToggleInput from "../ToggleInput/ToggleInput";

const AdditionalInfoForm: FC = () => {
  return (
    <div>
      <div>
        <label>
          Предоставление услуг с использованием сайта в сети Интернет
        </label>
        <Field
          name="isProvidingInternet"
          component={ToggleInput}
          type="checkbox"
        />
      </div>
      <div>
        <label>Статус публичного должностного лица (ПДЛ)</label>
        <Field
          name="isPublicOfficial"
          component={ToggleInput}
          type="checkbox"
        />
      </div>
      <div>
        <label>Наличие выгодоприобретателей</label>
        <Field
          name="haveBeneficiaries"
          component={ToggleInput}
          type="checkbox"
        />
      </div>
      <div>
        <label>Наличие представителей</label>
        <Field
          name="haveRepresentatives"
          component={ToggleInput}
          type="checkbox"
        />
      </div>
      <div>
        <label>Наличие бенефициарного владельца</label>
        <Field
          name="haveBeneficialOwner"
          component={ToggleInput}
          type="checkbox"
        />
      </div>
    </div>
  );
};

export default AdditionalInfoForm;
