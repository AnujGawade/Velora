import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) => {
  const getControlItemInputType = (item) => {
    const value = formData[item.name] || '';

    switch (item.componentType) {
      case 'input':
        return (
          <Input
            id={item.name}
            name={item.name}
            type={item.type || 'text'}
            placeholder={item.placeholder || item.label}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [item.name]: event.target.value,
              })
            }
          />
        );

      case 'textarea':
        return (
          <Textarea
            id={item.name}
            name={item.name}
            placeholder={item.placeholder || item.label}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [item.name]: event.target.value,
              })
            }
          />
        );

      case 'select':
        return (
          <Select
            value={value}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [item.name]: value,
              })
            }
          >
            <SelectTrigger className="w-full" id={item.name}>
              <SelectValue placeholder={item.label} />
            </SelectTrigger>
            <SelectContent>
              {item.options && item.options.length > 0 ? (
                item.options.map((option) => (
                  <SelectItem
                    key={option.id}
                    value={String(option.id)} // value must be a string
                  >
                    {option.label}
                  </SelectItem>
                ))
              ) : (
                <p className="text-gray-400 px-2 py-1">No options</p>
              )}
            </SelectContent>
          </Select>
        );

      default:
        return (
          <Input
            id={item.name}
            name={item.name}
            type={item.type || 'text'}
            placeholder={item.placeholder || item.label}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [item.name]: event.target.value,
              })
            }
          />
        );
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1" htmlFor={controlItem.name}>
              {controlItem.label || controlItem.name}
            </Label>
            {getControlItemInputType(controlItem)}
          </div>
        ))}
      </div>

      <Button disabled={isBtnDisabled} type="submit" className="mt-4 mb-2">
        {buttonText || 'Submit'}
      </Button>
    </form>
  );
};

export default CommonForm;
