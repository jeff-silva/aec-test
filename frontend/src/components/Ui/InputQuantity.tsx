import { Icon } from '@iconify/react';

const InputQuantity = ({
  className = "",
  value = 0,
  min = Infinity,
  max = Infinity,
  step = 1,
  iconSub = 'ic:outline-minus',
  iconAdd = 'ic:outline-add',
  onInput = (value: number) => null,
}) => {
  const numberValid = (value: number) => {
    if (min && value < min) {
      value = min;
    }
    else if (max && value > max) {
      value = max;
    }
    return value;
  };

  return (
    <div className={`flex ${className}`}>
      <button
        type="button"
        className="bg-gray-200 px-3"
        onClick={(ev) => {
          onInput(numberValid(value - 1));
        }}
      >
        <Icon icon={iconSub} />
      </button>

      <input
        type="text"
        className="grow w-full p-2 text-center"
        value={value}
        min={min}
        max={max}
        step={step}
        onInput={(ev) => {
          const value = +(ev.target as HTMLInputElement).value;
          onInput(numberValid(value));
        }}
        onKeyUp={(ev) => {
          let value = +(ev.target as HTMLInputElement).value;
          value = isNaN(value) ? 0 : value;

          if (ev.key == 'ArrowUp') { value++; }
          else if (ev.key == 'ArrowDown') { value--; }

          onInput(numberValid(value));
        }}
      />

      <button
        type="button"
        className="bg-gray-200 px-3"
        onClick={(ev) => {
          onInput(numberValid(value + 1));
        }}
      >
        <Icon icon={iconAdd} />
      </button>
    </div>
  );
};

export default InputQuantity;