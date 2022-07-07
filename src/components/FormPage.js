import { Form, Input, Button, Select, DatePicker, InputNumber } from "antd";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const startDate = moment("10/06/2020", "DD/MM/YYYY");
const endDate = moment("15/07.2020", "DD/MM/YYYY");

const defaultValues = {
  dropdown: "",
  input: "",
  inputNumber: "",
  datePickerFrom: "",
  datePickerTo: "",
};

const ErrorParagraph = styled.p`
  color: red;
  text-align: center;
`;

const YellowButton = styled(Button)`
  background-color: yellow;
  color: black;
  text-align: center;
`;

const GreenButton = styled(Button)`
  text-align: center;
  background-color: green;
`;

function FormPage(props) {
  let navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm({ defaultValues });

  const onSubmit = async (data) => {
    navigate("../table", { replace: true });
  };

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      disabled={props.checkBox}
      onFinish={handleSubmit((data) => onSubmit(data))}
    >
      <Form.Item label="Select">
        <Controller
          name="dropdown"
          defaultValue="A"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select {...field}>
              <Select.Option value="A">A</Select.Option>
              <Select.Option value="B">B</Select.Option>
              <Select.Option value="C">C</Select.Option>
            </Select>
          )}
        />
        {errors.dropdown && errors.dropdown.type === "required" && (
          <ErrorParagraph className="e">This field is required</ErrorParagraph>
        )}
      </Form.Item>
      <Form.Item label="Input">
        <Controller
          name="input"
          control={control}
          rules={{
            required: true,
            validate: () => {
              return !(
                getValues("dropdown") === "C" && getValues("input").length < 3
              );
            },
          }}
          render={({ field }) => <Input {...field} />}
        />
        {errors.input && errors.input.type === "required" && (
          <ErrorParagraph>This field is required</ErrorParagraph>
        )}
      </Form.Item>
      <Form.Item label="InputNumber">
        <Controller
          name="inputNumber"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <InputNumber {...field} />}
        />
        {errors.inputNumber && errors.inputNumber.type === "required" && (
          <ErrorParagraph>This field is required</ErrorParagraph>
        )}
      </Form.Item>
      <Form.Item label="DatePicker from">
        <Controller
          name="datePickerFrom"
          control={control}
          rules={{
            required: true,
            validate: () => {
              return getValues("datePickerFrom") > moment();
            },
          }}
          render={({ field }) => <DatePicker {...field} />}
        />
        {errors.datePickerFrom && errors.datePickerFrom.type === "required" && (
          <ErrorParagraph>This field is required</ErrorParagraph>
        )}
      </Form.Item>
      <Form.Item label="DatePicker to">
        <Controller
          name="datePickerTo"
          control={control}
          rules={{
            required: true,
            validate: () => {
              return !(
                getValues("datePickerTo").isBetween(
                  startDate,
                  endDate,
                  "days",
                  "[]"
                ) &&
                getValues("datePickerFrom").isSame(
                  getValues("datePickerTo"),
                  "days"
                )
              );
            },
          }}
          render={({ field }) => <DatePicker {...field} />}
        />
        {errors.datePickerTo && errors.datePickerTo.type === "required" && (
          <ErrorParagraph>This field is required</ErrorParagraph>
        )}
      </Form.Item>
      {errors.input && errors.input.type === "validate" && (
        <ErrorParagraph>Criteria not met</ErrorParagraph>
      )}
      {errors.datePickerTo && errors.datePickerTo.type === "validate" && (
        <ErrorParagraph>Dates Overlap</ErrorParagraph>
      )}
      <Form.Item>
        {errors.datePickerFrom && errors.datePickerFrom.type === "validate" ? (
          <YellowButton type="primary" htmlType="submit">
            Submit
          </YellowButton>
        ) : (
          <GreenButton type="primary" htmlType="submit">
            Submit
          </GreenButton>
        )}
      </Form.Item>
    </Form>
  );
}

export default FormPage;
