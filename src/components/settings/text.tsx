import {
  fontFamilyOptions,
  fontSizeOptions,
  fontWeightOptions,
} from '@/constants'
import useCanvas from '@/hooks/canvas'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

const SELECT_CONFIGS = [
  {
    property: 'fontFamily',
    placeholder: 'Choose a font',
    options: fontFamilyOptions,
  },
  { property: 'fontSize', placeholder: '30', options: fontSizeOptions },
  {
    property: 'fontWeight',
    placeholder: 'Semibold',
    options: fontWeightOptions,
  },
]

function Text() {
  const {
    elementAttributes: { fontSize, fontWeight, fontFamily },
    onUpdateElementAttributes,
  } = useCanvas()

  return (
    <div className="flex flex-col gap-3 border-b border-secondary px-5 py-3">
      <h3 className="text-[10px] uppercase">Text</h3>

      <div className="flex flex-col gap-3">
        {RenderSelect({
          config: SELECT_CONFIGS[0],
          fontSize,
          fontWeight,
          fontFamily,
          handleInputChange: onUpdateElementAttributes,
        })}

        <div className="flex gap-2">
          {SELECT_CONFIGS.slice(1).map((config) =>
            RenderSelect({
              config,
              fontSize,
              fontWeight,
              fontFamily,
              handleInputChange: onUpdateElementAttributes,
            }),
          )}
        </div>
      </div>
    </div>
  )
}

type Props = {
  config: {
    property: string
    placeholder: string
    options: { label: string; value: string }[]
  }
  fontSize: string
  fontWeight: string
  fontFamily: string
  handleInputChange: (property: string, value: string) => void
}

const RenderSelect = ({
  config,
  fontSize,
  fontWeight,
  fontFamily,
  handleInputChange,
}: Props) => (
  <Select
    key={config.property}
    onValueChange={(value) => handleInputChange(config.property, value)}
    value={
      config.property === 'fontFamily'
        ? fontFamily
        : config.property === 'fontSize'
          ? fontSize
          : fontWeight
    }
  >
    <SelectTrigger>
      <SelectValue
        placeholder={
          config.property === 'fontFamily'
            ? 'Choose a font'
            : config.property === 'fontSize'
              ? '30'
              : 'Semibold'
        }
      />
    </SelectTrigger>
    <SelectContent>
      {config.options.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
)

export default Text
