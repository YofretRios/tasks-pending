import { Switch } from '@headlessui/react';

export default function Toggle({ onToggle, status }) {
  const onChange = (value) => {
    onToggle(value);
  };

  return (
    <Switch
      checked={status}
      onChange={onChange}
      className={`${
        status ? 'bg-blue-600' : 'bg-gray-200'
      } relative inline-flex items-center h-6 rounded-full w-11`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          status ? 'translate-x-6' : 'translate-x-1'
        } inline-block w-4 h-4 transform bg-white rounded-full`}
      />
    </Switch>
  );
}
