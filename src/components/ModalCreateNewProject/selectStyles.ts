import { darken } from 'polished'
import { CSSObjectWithLabel } from 'react-select'

export const selectStyles = {
  control: (base: CSSObjectWithLabel) => ({
    ...base,
    backgroundColor: "transparent",
    color: "#efece6",
    borderColor: "#efece6",
    boxShadow: "none",
    "&:hover": {
      borderColor: darken(0.4, '#efece6'),
    },
  }),
  option: (base: CSSObjectWithLabel) => ({
    ...base,
    color: "#efece6",
  }),
  input: (base: CSSObjectWithLabel) => ({
    ...base,
    color: "#efece6",
  }),
  multiValue: (base: CSSObjectWithLabel) => ({
    ...base,
    background: 'transparent',
    borderColor: "#a4445e",
    borderWidth: 1,
    borderStyle: 'solid',
    "&:hover": {
      borderColor: darken(0.4, '#a4445e'),
    },
  }),
  multiValueLabel: (base: CSSObjectWithLabel) => ({
    ...base,
    color: "#efece6",
  })
}