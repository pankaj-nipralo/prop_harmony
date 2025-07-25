import React from 'react';
import { Save, Settings, Trash2, Plus } from 'lucide-react';
import Button from './Button';

/**
 * Simple test component to verify Button functionality
 * This can be used for manual testing or as a reference
 */
const ButtonTest = () => {
  const handleClick = (variant) => {
    alert(`${variant} button clicked!`);
  };

  return (
    <div className="p-8 space-y-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Button Component Test</h1>
        
        {/* Color Variants Test */}
        <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Color Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button 
              variant="blue" 
              text="Blue Button" 
              onClick={() => handleClick('Blue')} 
            />
            <Button 
              variant="red" 
              text="Red Button" 
              onClick={() => handleClick('Red')} 
            />
            <Button 
              variant="green" 
              text="Green Button" 
              onClick={() => handleClick('Green')} 
            />
            <Button 
              variant="yellow" 
              text="Yellow Button" 
              onClick={() => handleClick('Yellow')} 
            />
          </div>
        </section>

        {/* Color Variants with Icons */}
        <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Color Variants with Icons</h2>
          <div className="flex flex-wrap gap-4">
            <Button 
              variant="blue" 
              icon={Save}
              text="Save" 
              onClick={() => handleClick('Blue Save')} 
            />
            <Button 
              variant="red" 
              icon={Trash2}
              text="Delete" 
              onClick={() => handleClick('Red Delete')} 
            />
            <Button 
              variant="green" 
              icon={Plus}
              text="Add" 
              onClick={() => handleClick('Green Add')} 
            />
            <Button 
              variant="yellow" 
              icon={Settings}
              text="Settings" 
              onClick={() => handleClick('Yellow Settings')} 
            />
          </div>
        </section>

        {/* Icon Only Buttons */}
        <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Icon Only Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button 
              variant="blue" 
              icon={Save}
              iconOnly
              onClick={() => handleClick('Blue Icon')} 
            />
            <Button 
              variant="red" 
              icon={Trash2}
              iconOnly
              onClick={() => handleClick('Red Icon')} 
            />
            <Button 
              variant="green" 
              icon={Plus}
              iconOnly
              onClick={() => handleClick('Green Icon')} 
            />
            <Button 
              variant="yellow" 
              icon={Settings}
              iconOnly
              onClick={() => handleClick('Yellow Icon')} 
            />
          </div>
        </section>

        {/* Different Sizes */}
        <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Different Sizes</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button 
              variant="blue" 
              size="sm"
              text="Small" 
              onClick={() => handleClick('Small')} 
            />
            <Button 
              variant="green" 
              size="md"
              text="Medium" 
              onClick={() => handleClick('Medium')} 
            />
            <Button 
              variant="red" 
              size="lg"
              text="Large" 
              onClick={() => handleClick('Large')} 
            />
          </div>
        </section>

        {/* States */}
        <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Button States</h2>
          <div className="flex flex-wrap gap-4">
            <Button 
              variant="blue" 
              text="Normal" 
              onClick={() => handleClick('Normal')} 
            />
            <Button 
              variant="blue" 
              text="Disabled" 
              disabled
              onClick={() => handleClick('Disabled')} 
            />
            <Button 
              variant="blue" 
              text="Loading..." 
              loading
              onClick={() => handleClick('Loading')} 
            />
          </div>
        </section>

        {/* Style Variants */}
        <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Style Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button 
              variant="primary" 
              text="Primary" 
              onClick={() => handleClick('Primary')} 
            />
            <Button 
              variant="secondary" 
              text="Secondary" 
              onClick={() => handleClick('Secondary')} 
            />
            <Button 
              variant="outline" 
              text="Outline" 
              onClick={() => handleClick('Outline')} 
            />
            <Button 
              variant="ghost" 
              text="Ghost" 
              onClick={() => handleClick('Ghost')} 
            />
            <Button 
              variant="link" 
              text="Link" 
              onClick={() => handleClick('Link')} 
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ButtonTest;
