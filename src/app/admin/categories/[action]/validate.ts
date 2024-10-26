import {Attribute, Category} from "../../../../../utils/types";
import {ADDABLE_INPUT_TYPE} from "../../../../../utils/constants";

export const submitValidation = (data: Category) => {
    let isError = false, errorDetail = {
        name: '',
        attribute: {
            label: '',
            initialValues: ''
        }
    }

    if (!data.name) {
        isError = true
        errorDetail = {
            ...errorDetail,
            name: 'Tên danh mục không được bỏ trống!'
        }
    }

    if (data.attributes?.length > 0) {
        const attributes: Attribute[] = data.attributes
        const hasAddableInputTypeAndLabelButNoValues = attributes.some(
            (item: Attribute) =>
                ADDABLE_INPUT_TYPE.includes(item.input_type)
                && item.label
                && !item.initial_value
        )
        if (hasAddableInputTypeAndLabelButNoValues) {
            isError = true
            errorDetail = {
                ...errorDetail,
                attribute: {
                    ...errorDetail.attribute,
                    initialValues: 'Các lựa chọn của thuộc tính đã điền tên không được bỏ trống!'
                }
            }
        }
        const hasAddableInputTypeAndHasValuesButNoLabel = attributes.some(
            (item: Attribute) =>
                ADDABLE_INPUT_TYPE.includes(item.input_type)
                && (item.initial_value && item.initial_value?.length > 0)
                && !item.label
        )
        if (hasAddableInputTypeAndHasValuesButNoLabel) {
            isError = true
            errorDetail = {
                ...errorDetail,
                attribute: {
                    ...errorDetail.attribute,
                    label: 'Tên thuộc tính chứa các lựa chọn đã có giá trị không được bỏ trống!'
                }
            }
        }
    }

    return {isError, errorDetail}
}
