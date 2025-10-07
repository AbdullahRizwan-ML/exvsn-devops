import React, { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

function Chatbot() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI assistant. How can I help you today?", sender: "bot", time: "10:30 AM" },
    { id: 2, text: "What's our current revenue trend?", sender: "user", time: "10:31 AM" },
    { id: 3, text: "Based on the latest data, your revenue has increased by 12.5% this month compared to last month. The trend shows consistent growth across all product lines.", sender: "bot", time: "10:31 AM" }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage("");
    setIsTyping(true);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "I understand you're asking about: " + newMessage + ". Let me analyze that data for you...",
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const quickQuestions = [
    "What's our top performing product?",
    "Show me competitor analysis",
    "Generate a forecast report",
    "What are the pricing trends?"
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#111827" }}>
            AI Chatbot
          </h1>
          <p style={{ margin: 4, color: "#6b7280", fontSize: 16 }}>
            Get instant insights from your business data
          </p>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Button variant="secondary">Clear Chat</Button>
          <Button variant="primary">Export Chat</Button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        {/* Chat Interface */}
        <Card style={{ height: "600px", display: "flex", flexDirection: "column" }}>
          <div style={{ 
            flex: 1, 
            overflowY: "auto", 
            padding: "20px", 
            display: "flex", 
            flexDirection: "column", 
            gap: 16 
          }}>
            {messages.map((message) => (
              <div key={message.id} style={{ 
                display: "flex", 
                justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
                marginBottom: 8
              }}>
                <div style={{ 
                  maxWidth: "70%",
                  padding: "12px 16px",
                  borderRadius: message.sender === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  background: message.sender === "user" ? "#3b82f6" : "#f3f4f6",
                  color: message.sender === "user" ? "white" : "#111827"
                }}>
                  <div style={{ marginBottom: 4 }}>{message.text}</div>
                  <div style={{ 
                    fontSize: 12, 
                    opacity: 0.7,
                    textAlign: message.sender === "user" ? "right" : "left"
                  }}>
                    {message.time}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{ 
                  padding: "12px 16px",
                  borderRadius: "18px 18px 18px 4px",
                  background: "#f3f4f6",
                  color: "#6b7280"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span>AI is typing</span>
                    <div style={{ display: "flex", gap: 2 }}>
                      <div style={{ width: 4, height: 4, background: "#6b7280", borderRadius: "50%", animation: "pulse 1.4s infinite" }}></div>
                      <div style={{ width: 4, height: 4, background: "#6b7280", borderRadius: "50%", animation: "pulse 1.4s infinite 0.2s" }}></div>
                      <div style={{ width: 4, height: 4, background: "#6b7280", borderRadius: "50%", animation: "pulse 1.4s infinite 0.4s" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div style={{ padding: "20px", borderTop: "1px solid #e5e7eb" }}>
            <div style={{ display: "flex", gap: 12 }}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask me anything about your business data..."
                style={{ 
                  flex: 1, 
                  padding: "12px 16px", 
                  border: "1px solid #d1d5db", 
                  borderRadius: 24,
                  outline: "none",
                  fontSize: 14
                }}
              />
              <Button 
                variant="primary" 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                style={{ borderRadius: 24, padding: "12px 20px" }}
              >
                Send
              </Button>
            </div>
          </div>
        </Card>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card>
            <h3 style={{ margin: "0 0 16px 0", fontSize: 16, fontWeight: 600 }}>Quick Questions</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setNewMessage(question)}
                  style={{
                    padding: "8px 12px",
                    background: "#f3f4f6",
                    border: "1px solid #e5e7eb",
                    borderRadius: 8,
                    cursor: "pointer",
                    textAlign: "left",
                    fontSize: 14,
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => e.target.style.background = "#e5e7eb"}
                  onMouseLeave={(e) => e.target.style.background = "#f3f4f6"}
                >
                  {question}
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <h3 style={{ margin: "0 0 16px 0", fontSize: 16, fontWeight: 600 }}>Chat Stats</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 14, color: "#6b7280" }}>Messages Today</span>
                <span style={{ fontWeight: 600 }}>23</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 14, color: "#6b7280" }}>Response Time</span>
                <span style={{ fontWeight: 600 }}>1.2s</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 14, color: "#6b7280" }}>Accuracy</span>
                <span style={{ fontWeight: 600, color: "#10b981" }}>94.2%</span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 style={{ margin: "0 0 16px 0", fontSize: 16, fontWeight: 600 }}>Data Sources</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { name: "Sales Data", status: "connected", icon: "📊" },
                { name: "Pricing Data", status: "connected", icon: "💰" },
                { name: "Competitor Data", status: "connected", icon: "👥" },
                { name: "Forecast Data", status: "syncing", icon: "📈" }
              ].map((source, index) => (
                <div key={index} style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: 8,
                  padding: "8px 0"
                }}>
                  <span>{source.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{source.name}</div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>{source.status}</div>
                  </div>
                  <div style={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: "50%", 
                    background: source.status === "connected" ? "#10b981" : "#f59e0b"
                  }} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
