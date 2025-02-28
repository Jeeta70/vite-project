import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import React Icons

const TabContent: React.FC<{ tabIndex: number }> = ({ tabIndex }) => {
  switch (tabIndex) {
    case 0:
      return <div>Content of Tab 1</div>;
    case 1:
      return <div>Content of Tab 2</div>;
    case 2:
      return <div>Content of Tab 3</div>;
    default:
      return <div>Unknown Tab</div>;
  }
};

const TabsComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0); // Track active tab
  const [history, setHistory] = useState<number[]>([0]); // Store tab history for back/forward navigation

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    setHistory([...history, index]); // Add the new tab to history
  };

  const handleBackClick = () => {
    if (history.length > 1) {
      // Go back in history
      const newHistory = [...history];
      newHistory.pop(); // Remove the current tab
      const previousTab = newHistory[newHistory.length - 1]; // Get the last tab from history
      setActiveTab(previousTab);
      setHistory(newHistory); // Update the history
    }
  };

  const handleForwardClick = () => {
    const nextTab = activeTab + 1;
    if (nextTab < 3) {
      setActiveTab(nextTab);
      setHistory([...history, nextTab]); // Add the next tab to history
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <div>
        {/* Tab navigation buttons */}
        <button style={tabButtonStyle} onClick={() => handleTabClick(0)}>Tab 1</button>
        <button style={tabButtonStyle} onClick={() => handleTabClick(1)}>Tab 2</button>
        <button style={tabButtonStyle} onClick={() => handleTabClick(2)}>Tab 3</button>
      </div>

      <div style={{ margin: '20px' }}>
        {/* Back and Forward buttons */}
        <button
          style={{ ...backForwardButtonStyle, ...(history.length <= 1 && buttonDisabledStyle) }}
          onClick={handleBackClick}
          disabled={history.length <= 1}
        >
          <FaArrowLeft style={iconStyle} /> Back
        </button>

        <button
          style={{ ...backForwardButtonStyle, ...(activeTab === 2 && buttonDisabledStyle) }}
          onClick={handleForwardClick}
          disabled={activeTab === 2}
        >
          Forward <FaArrowRight style={iconStyle} />
        </button>
      </div>

      <div>
        {/* Render content based on active tab */}
        <TabContent tabIndex={activeTab} />
      </div>
    </div>
  );
};

// Custom CSS styles for the components
const tabButtonStyle: React.CSSProperties = {
  padding: '12px 24px',
  fontSize: '16px',
  margin: '0 15px',
  border: '2px solid #007BFF',
  borderRadius: '50px',
  backgroundColor: '#007BFF',
  color: '#fff',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
};

const backForwardButtonStyle: React.CSSProperties = {
  padding: '12px 24px',
  fontSize: '16px',
  margin: '0 15px',
  border: '2px solid #28a745',
  borderRadius: '50px',
  backgroundColor: '#28a745',
  color: '#fff',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
  display: 'inline-flex',
  alignItems: 'center',
};

const iconStyle: React.CSSProperties = {
  marginRight: '8px',
  marginLeft: '8px',
};

// Hover and Disabled State Styles
const buttonHoverStyle: React.CSSProperties = {
  backgroundColor: '#218838',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transform: 'scale(1.05)',
};

const buttonDisabledStyle: React.CSSProperties = {
  backgroundColor: '#f0f0f0',
  color: '#b0b0b0',
  cursor: 'not-allowed',
  borderColor: '#ccc',
};

export default TabsComponent;
