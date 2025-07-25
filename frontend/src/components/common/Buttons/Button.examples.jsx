import React, { useState } from 'react';
import { Save, Download, Trash2, Plus, Settings, ArrowRight, ArrowLeft } from 'lucide-react';
import Button from './Button';

/**
 * Button Component Examples and Usage Guide
 * This file demonstrates all the different ways to use the Button component
 */
const ButtonExamples = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    console.log('Button clicked!');
  };

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Button Component Examples</h1>
        <p className="text-gray-600 mb-8">
          Comprehensive examples of the reusable Button component with different variants, sizes, and states.
        </p>

        {/* Color Variants */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Color Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="blue" text="Blue Button" onClick={handleClick} />
            <Button variant="red" text="Red Button" onClick={handleClick} />
            <Button variant="green" text="Green Button" onClick={handleClick} />
            <Button variant="yellow" text="Yellow Button" onClick={handleClick} />
          </div>
        </section>

        {/* Basic Variants */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Style Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" text="Primary Button" onClick={handleClick} />
            <Button variant="secondary" text="Secondary Button" onClick={handleClick} />
            <Button variant="danger" text="Danger Button" onClick={handleClick} />
            <Button variant="outline" text="Outline Button" onClick={handleClick} />
            <Button variant="ghost" text="Ghost Button" onClick={handleClick} />
            <Button variant="link" text="Link Button" onClick={handleClick} />
          </div>
        </section>

        {/* Sizes */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Sizes</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" size="sm" text="Small" onClick={handleClick} />
            <Button variant="primary" size="md" text="Medium (Default)" onClick={handleClick} />
            <Button variant="primary" size="lg" text="Large" onClick={handleClick} />
          </div>
        </section>

        {/* Color Variants with Icons */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Color Variants with Icons</h2>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="blue"
              icon={Save}
              text="Save Changes"
              onClick={handleClick}
            />
            <Button
              variant="green"
              icon={Download}
              text="Download"
              onClick={handleClick}
            />
            <Button
              variant="red"
              icon={Trash2}
              text="Delete"
              onClick={handleClick}
            />
            <Button
              variant="yellow"
              icon={Plus}
              text="Add New"
              onClick={handleClick}
            />
          </div>
        </section>

        {/* With Icons */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Style Variants with Icons</h2>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="primary"
              icon={Save}
              text="Save Changes"
              onClick={handleClick}
            />
            <Button
              variant="secondary"
              icon={Download}
              text="Download"
              onClick={handleClick}
            />
            <Button
              variant="danger"
              icon={Trash2}
              text="Delete"
              onClick={handleClick}
            />
            <Button
              variant="outline"
              icon={Plus}
              text="Add New"
              onClick={handleClick}
            />
          </div>
        </section>

        {/* Icon Position */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Icon Position</h2>
          <div className="flex flex-wrap gap-4">
            <Button 
              variant="primary" 
              icon={ArrowLeft} 
              text="Previous" 
              iconPosition="left"
              onClick={handleClick} 
            />
            <Button 
              variant="primary" 
              icon={ArrowRight} 
              text="Next" 
              iconPosition="right"
              onClick={handleClick} 
            />
          </div>
        </section>

        {/* Icon Only Buttons - Colors */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Icon Only Buttons - Colors</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="blue" icon={Save} iconOnly onClick={handleClick} />
            <Button variant="green" icon={Settings} iconOnly onClick={handleClick} />
            <Button variant="red" icon={Trash2} iconOnly onClick={handleClick} />
            <Button variant="yellow" icon={Plus} iconOnly onClick={handleClick} />
          </div>
        </section>

        {/* Icon Only Buttons - Styles */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Icon Only Buttons - Styles</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" icon={Save} iconOnly onClick={handleClick} />
            <Button variant="secondary" icon={Settings} iconOnly onClick={handleClick} />
            <Button variant="danger" icon={Trash2} iconOnly onClick={handleClick} />
            <Button variant="outline" icon={Plus} iconOnly onClick={handleClick} />
          </div>
        </section>

        {/* States */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">States</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" text="Normal" onClick={handleClick} />
            <Button variant="primary" text="Disabled" disabled onClick={handleClick} />
            <Button 
              variant="primary" 
              icon={Save}
              text={loading ? "Saving..." : "Save with Loading"} 
              loading={loading}
              onClick={handleLoadingDemo} 
            />
          </div>
        </section>

        {/* Using children instead of text prop */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Using Children</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" icon={Save} onClick={handleClick}>
              Save Document
            </Button>
            <Button variant="secondary" onClick={handleClick}>
              <span className="font-bold">Bold Text</span>
            </Button>
          </div>
        </section>

        {/* Form Buttons */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Form Buttons</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="flex gap-4">
              <Button 
                type="submit" 
                variant="primary" 
                icon={Save}
                text="Submit Form" 
              />
              <Button 
                type="reset" 
                variant="outline" 
                text="Reset Form" 
              />
              <Button 
                type="button" 
                variant="ghost" 
                text="Cancel" 
              />
            </div>
          </form>
        </section>

        {/* Custom Styling */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Custom Styling</h2>
          <div className="flex flex-wrap gap-4">
            <Button 
              variant="primary" 
              text="Custom Classes" 
              className="shadow-lg transform hover:scale-105"
              onClick={handleClick} 
            />
            <Button 
              variant="outline" 
              icon={Settings}
              text="Rounded Full" 
              className="rounded-full"
              onClick={handleClick} 
            />
          </div>
        </section>

        {/* Usage Code Examples */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Usage Examples</h2>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <pre>{`// Color variants
<Button variant="blue" text="Blue Button" onClick={handleClick} />
<Button variant="red" text="Red Button" onClick={handleClick} />
<Button variant="green" text="Green Button" onClick={handleClick} />
<Button variant="yellow" text="Yellow Button" onClick={handleClick} />

// Basic usage with icon
<Button
  onClick={handleClick}
  icon={Save}
  text="Save Changes"
  variant="blue"
/>

// Icon only with colors
<Button
  icon={Settings}
  iconOnly
  variant="green"
  onClick={handleSettings}
/>

// With loading state
<Button
  loading={isLoading}
  text="Save Document"
  variant="blue"
  onClick={handleSave}
/>

// Using children
<Button variant="yellow" onClick={handleClick}>
  <span className="font-bold">Custom Content</span>
</Button>

// Form submit button
<Button
  type="submit"
  variant="green"
  text="Submit Form"
  disabled={!isValid}
/>`}</pre>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ButtonExamples;
