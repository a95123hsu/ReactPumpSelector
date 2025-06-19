import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Scatter, ScatterChart } from 'recharts';
import { Search, RefreshCw, RotateCcw, TrendingUp, Droplets, Building, Home, ChevronDown, ChevronUp } from 'lucide-react';

// Translation dictionary
const translations = {
  "English": {
    // App title and headers
    "Hung Pump": "Hung Pump",
    "Pump Selection Tool": "Pump Selection Tool",
    "Data loaded": "Data loaded: {n_records} records | Last update: {timestamp}",
    
    // Buttons
    "Refresh Data": "🔄 Refresh Data",
    "Reset Inputs": "🔄 Reset Inputs",
    "Search": "🔍 Search",
    "Show Curve": "📈 Show Pump Curve",
    "Update Curves": "📈 Update Curves",
    
    // Step 1
    "Step 1": "🔧 Step 1: Select Basic Criteria",
    "Category": "* Category:",
    "Frequency": "* Frequency (Hz):",
    "Phase": "* Phase:",
    "Select...": "Select...",
    "All Categories": "All Categories",
    "Show All Frequency": "Show All Frequency",
    "Show All Phase": "Show All Phase",
    
    // Column Selection
    "Column Selection": "📋 Column Selection",
    "Select Columns": "Select columns to display in results:",
    "Select All": "Select All",
    "Deselect All": "Deselect All",
    "Essential Columns": "Essential Columns (always shown)",
    
    // Categories
    "Dirty Water": "Dirty Water",
    "Clean Water": "Clean Water",
    "Speciality Pump": "Speciality Pump",
    "Grinder": "Grinder",
    "Construction": "Construction",
    "Sewage and Wastewater": "Sewage and Wastewater",
    "High Pressure": "High Pressure",
    "Booster": "Booster",
    "BLDC": "BLDC",
    
    // Application section
    "Application Input": "🏢 Application Input",
    "Floor Faucet Info": "💡 Each floor = 3.5 m TDH | Each faucet = 15 LPM",
    "Number of Floors": "Number of Floors",
    "Number of Faucets": "Number of Faucets",
    
    // Pond drainage
    "Pond Drainage": "🌊 Pond Drainage",
    "Pond Length": "Pond Length (m)",
    "Pond Width": "Pond Width (m)",
    "Pond Height": "Pond Height (m)",
    "Drain Time": "Drain Time (hours)",
    "Pond Volume": "📏 Pond Volume: {volume} L",
    "Required Flow": "💧 Required Flow to drain pond: {flow} {unit}",
    
    // Underground
    "Pump Depth": "Pump Depth Below Ground (m)",
    "Particle Size": "Max Particle Size (mm)",
    
    // Manual Input
    "Manual Input": "Manual Input",
    "Flow Unit": "Flow Unit",
    "Flow Value": "Flow Value",
    "Head Unit": "Head Unit",
    "TDH": "Total Dynamic Head (TDH)",
    
    // Estimated application
    "Estimated Application": "💡 Estimated Application (based on Manual Input)",
    "Estimated Floors": "Estimated Floors",
    "Estimated Faucets": "Estimated Faucets",
    
    // Results
    "Result Display": "📊 Result Display Control",
    "Show Percentage": "Show Top Percentage of Results",
    "Matching Pumps": "✅ Matching Pumps",
    "Found Pumps": "Found {count} matching pumps",
    "Matching Results": "Matching Pumps Results",
    "Showing Results": "Showing all {count} results",
    "View Product": "View Product",
    "Select Pumps": "Select pumps from the table below to view their performance curves",
    
    // Pump Curve Section
    "Pump Curves": "📈 Pump Performance Curves",
    "Select Pump": "Select a pump to view its performance curve:",
    "No Curve Data": "No curve data available for this pump model",
    "Curve Data Loaded": "Curve data loaded: {count} pumps with curve data",
    "Performance Curve": "Performance Curve - {model}",
    "Flow Rate": "Flow Rate ({unit})",
    "Head": "Head ({unit})",
    "Operating Point": "Your Operating Point",
    "Multiple Curves": "Performance Comparison",
    "Compare Pumps": "Compare Selected Pumps",
    
    // Column headers
    "Q Rated/LPM": "Q Rated/LPM",
    "Q Rated": "Q Rated ({unit})",
    "Head Rated/M": "Head Rated/M",
    "Head Rated": "Head Rated ({unit})",
    
    // Flow units
    "L/min": "L/min",
    "L/sec": "L/sec",
    "m³/hr": "m³/hr",
    "m³/min": "m³/min",
    "US gpm": "US gpm",
    
    // Head units
    "m": "m",
    "ft": "ft",
    
    // Warnings & Errors
    "Select Warning": "Please select Frequency and Phase to proceed.",
    "No Matches": "⚠️ No pumps match your criteria. Try adjusting the parameters.",
    "No Data": "❌ No pump data available. Please check your data source."
  },
  "繁體中文": {
    // App title and headers
    "Hung Pump": "宏泵集團",
    "Pump Selection Tool": "水泵選型工具",
    "Data loaded": "已載入資料: {n_records} 筆記錄 | 最後更新: {timestamp}",
    
    // Buttons
    "Refresh Data": "🔄 刷新資料",
    "Reset Inputs": "🔄 重置輸入",
    "Search": "🔍 搜尋",
    "Show Curve": "📈 顯示泵浦曲線",
    "Update Curves": "📈 更新曲線",
    
    // Step 1
    "Step 1": "🔧 步驟一: 選擇基本條件",
    "Category": "* 類別:",
    "Frequency": "* 頻率 (赫茲):",
    "Phase": "* 相數:",
    "Select...": "請選擇...",
    "All Categories": "所有類別",
    "Show All Frequency": "顯示所有頻率",
    "Show All Phase": "顯示所有相數",
    
    // Column Selection
    "Column Selection": "📋 欄位選擇",
    "Select Columns": "選擇要在結果中顯示的欄位:",
    "Select All": "全選",
    "Deselect All": "全部取消",
    "Essential Columns": "必要欄位 (總是顯示)",
    
    // Categories
    "Dirty Water": "污水泵",
    "Clean Water": "清水泵",
    "Speciality Pump": "特殊用途泵",
    "Grinder": "研磨泵",
    "Construction": "工業泵",
    "Sewage and Wastewater": "污水和廢水泵",
    "High Pressure": "高壓泵",
    "Booster": "加壓泵",
    "BLDC": "無刷直流泵",
    
    // Application section
    "Application Input": "🏢 應用輸入",
    "Floor Faucet Info": "💡 每樓層 = 3.5 米揚程 | 每水龍頭 = 15 LPM",
    "Number of Floors": "樓層數量",
    "Number of Faucets": "水龍頭數量",
    
    // Pond drainage
    "Pond Drainage": "🌊 池塘排水",
    "Pond Length": "池塘長度 (米)",
    "Pond Width": "池塘寬度 (米)",
    "Pond Height": "池塘高度 (米)",
    "Drain Time": "排水時間 (小時)",
    "Pond Volume": "📏 池塘體積: {volume} 升",
    "Required Flow": "💧 所需排水流量: {flow} {unit}",
    
    // Underground
    "Pump Depth": "幫浦地下深度 (米)",
    "Particle Size": "最大固體顆粒尺寸 (毫米)",
    
    // Manual Input
    "Manual Input": "手動輸入",
    "Flow Unit": "流量單位",
    "Flow Value": "流量值",
    "Head Unit": "揚程單位",
    "TDH": "總動態揚程 (TDH)",
    
    // Estimated application
    "Estimated Application": "💡 估計應用 (基於手動輸入)",
    "Estimated Floors": "估計樓層",
    "Estimated Faucets": "估計水龍頭",
    
    // Results
    "Result Display": "📊 結果顯示控制",
    "Show Percentage": "顯示前百分比的結果",
    "Matching Pumps": "✅ 符合條件的幫浦",
    "Found Pumps": "找到 {count} 個符合的幫浦",
    "Matching Results": "符合幫浦結果",
    "Showing Results": "顯示全部 {count} 筆結果",
    "View Product": "查看產品",
    "Select Pumps": "從下表選擇幫浦以查看其性能曲線",
    
    // Pump Curve Section
    "Pump Curves": "📈 幫浦性能曲線",
    "Select Pump": "選擇幫浦以查看其性能曲線:",
    "No Curve Data": "此幫浦型號無曲線資料",
    "Curve Data Loaded": "曲線資料已載入: {count} 個幫浦有曲線資料",
    "Performance Curve": "性能曲線 - {model}",
    "Flow Rate": "流量 ({unit})",
    "Head": "揚程 ({unit})",
    "Operating Point": "您的操作點",
    "Multiple Curves": "性能比較",
    "Compare Pumps": "比較選定的幫浦",
    
    // Column headers
    "Q Rated/LPM": "額定流量 (LPM)",
    "Q Rated": "額定流量 ({unit})",
    "Head Rated/M": "額定揚程 (M)",
    "Head Rated": "額定揚程 ({unit})",
    
    // Flow units
    "L/min": "公升/分鐘",
    "L/sec": "公升/秒",
    "m³/hr": "立方米/小時",
    "m³/min": "立方米/分鐘",
    "US gpm": "美制加侖/分鐘",
    
    // Head units
    "m": "米",
    "ft": "英尺",
    
    // Warnings & Errors
    "Select Warning": "請選擇頻率和相數以繼續。",
    "No Matches": "⚠️ 沒有符合您條件的幫浦。請調整參數。",
    "No Data": "❌ 無可用幫浦資料。請檢查您的資料來源。"
  }
};

// Sample pump data - in real app this would come from your API
const samplePumpData = [
  {
    "Model": "HP-100", "Model No.": "HP-100", "Category": "Clean Water", 
    "Frequency (Hz)": 50, "Phase": 3, "Q Rated/LPM": 120, "Head Rated/M": 25,
    "Pass Solid Dia(mm)": 0, "Product Link": "https://example.com/hp100"
  },
  {
    "Model": "HP-200", "Model No.": "HP-200", "Category": "Dirty Water", 
    "Frequency (Hz)": 60, "Phase": 1, "Q Rated/LPM": 200, "Head Rated/M": 15,
    "Pass Solid Dia(mm)": 10, "Product Link": "https://example.com/hp200"
  },
  {
    "Model": "HP-300", "Model No.": "HP-300", "Category": "Booster", 
    "Frequency (Hz)": 50, "Phase": 3, "Q Rated/LPM": 300, "Head Rated/M": 35,
    "Pass Solid Dia(mm)": 0, "Product Link": "https://example.com/hp300"
  },
  {
    "Model": "HP-400", "Model No.": "HP-400", "Category": "High Pressure", 
    "Frequency (Hz)": 60, "Phase": 3, "Q Rated/LPM": 150, "Head Rated/M": 50,
    "Pass Solid Dia(mm)": 5, "Product Link": "https://example.com/hp400"
  }
];

// Sample curve data
const sampleCurveData = [
  {
    "Model No.": "HP-100",
    "10M": 180, "15M": 150, "20M": 120, "25M": 80, "30M": 40
  },
  {
    "Model No.": "HP-200", 
    "5M": 250, "10M": 220, "15M": 180, "20M": 120, "25M": 60
  },
  {
    "Model No.": "HP-300",
    "15M": 350, "20M": 320, "25M": 280, "30M": 240, "35M": 180, "40M": 100
  },
  {
    "Model No.": "HP-400",
    "20M": 200, "30M": 180, "40M": 150, "50M": 100, "60M": 50
  }
];

// Utility functions
const getText = (key, lang = "English", params = {}) => {
  let text = translations[lang]?.[key] || translations["English"]?.[key] || key;
  Object.keys(params).forEach(param => {
    text = text.replace(`{${param}}`, params[param]);
  });
  return text;
};

const convertFlowFromLpm = (value, toUnit) => {
  switch(toUnit) {
    case "L/min": return value;
    case "L/sec": return value / 60;
    case "m³/hr": return value * 60 / 1000;
    case "m³/min": return value / 1000;
    case "US gpm": return value / 3.785;
    default: return value;
  }
};

const convertFlowToLpm = (value, fromUnit) => {
  switch(fromUnit) {
    case "L/min": return value;
    case "L/sec": return value * 60;
    case "m³/hr": return value * 1000 / 60;
    case "m³/min": return value * 1000;
    case "US gpm": return value * 3.785;
    default: return value;
  }
};

const convertHeadFromM = (value, toUnit) => {
  switch(toUnit) {
    case "m": return value;
    case "ft": return value * 3.28084;
    default: return value;
  }
};

const convertHeadToM = (value, fromUnit) => {
  switch(fromUnit) {
    case "m": return value;
    case "ft": return value * 0.3048;
    default: return value;
  }
};

const PumpSelectionApp = () => {
  // State management
  const [language, setLanguage] = useState("English");
  const [pumpData, setPumpData] = useState(samplePumpData);
  const [curveData, setCurveData] = useState(sampleCurveData);
  const [loading, setLoading] = useState(false);
  
  // Filter states
  const [category, setCategory] = useState("");
  const [frequency, setFrequency] = useState("");
  const [phase, setPhase] = useState("");
  
  // Application inputs
  const [floors, setFloors] = useState(0);
  const [faucets, setFaucets] = useState(0);
  const [pondLength, setPondLength] = useState(0);
  const [pondWidth, setPondWidth] = useState(0);
  const [pondHeight, setPondHeight] = useState(0);
  const [drainTime, setDrainTime] = useState(0.01);
  const [undergroundDepth, setUndergroundDepth] = useState(0);
  const [particleSize, setParticleSize] = useState(0);
  
  // Manual inputs
  const [flowUnit, setFlowUnit] = useState("L/min");
  const [flowValue, setFlowValue] = useState(0);
  const [headUnit, setHeadUnit] = useState("m");
  const [headValue, setHeadValue] = useState(0);
  
  // Results
  const [filteredPumps, setFilteredPumps] = useState([]);
  const [selectedPumps, setSelectedPumps] = useState([]);
  const [resultPercent, setResultPercent] = useState(100);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [showColumnSelection, setShowColumnSelection] = useState(false);
  
  // Calculated values
  const pondVolume = pondLength * pondWidth * pondHeight * 1000;
  const drainTimeMin = drainTime * 60;
  const pondLpm = pondVolume / drainTimeMin || 0;
  
  const autoFlow = category === "Booster" ? Math.max(faucets * 15, pondLpm) : pondLpm;
  const autoTdh = category === "Booster" ? Math.max(floors * 3.5, pondHeight) : 
                  (undergroundDepth > 0 ? undergroundDepth : pondHeight);
  
  // Get unique values for dropdowns
  const categories = [...new Set(pumpData.map(p => p.Category))].filter(Boolean);
  const frequencies = [...new Set(pumpData.map(p => p["Frequency (Hz)"]))].filter(Boolean).sort((a,b) => a-b);
  const phases = [...new Set(pumpData.map(p => p.Phase))].filter(Boolean).sort((a,b) => a-b);
  
  // Available columns for selection
  const essentialColumns = ["Model", "Model No."];
  const allColumns = Object.keys(pumpData[0] || {}).filter(col => col !== "DB ID");
  const optionalColumns = allColumns.filter(col => !essentialColumns.includes(col));
  
  // Auto-fill flow and head values
  useEffect(() => {
    if (autoFlow > 0) {
      setFlowValue(convertFlowFromLpm(autoFlow, flowUnit));
    }
  }, [autoFlow, flowUnit]);
  
  useEffect(() => {
    if (autoTdh > 0) {
      setHeadValue(convertHeadFromM(autoTdh, headUnit));
    }
  }, [autoTdh, headUnit]);
  
  // Reset function
  const resetInputs = () => {
    setCategory("");
    setFrequency("");
    setPhase("");
    setFloors(0);
    setFaucets(0);
    setPondLength(0);
    setPondWidth(0);
    setPondHeight(0);
    setDrainTime(0.01);
    setUndergroundDepth(0);
    setParticleSize(0);
    setFlowValue(0);
    setHeadValue(0);
    setFilteredPumps([]);
    setSelectedPumps([]);
    setSelectedColumns([]);
  };
  
  // Search function
  const handleSearch = () => {
    setLoading(true);
    
    let filtered = [...pumpData];
    
    // Apply filters
    if (category && category !== getText("All Categories", language)) {
      filtered = filtered.filter(pump => pump.Category === category);
    }
    if (frequency && frequency !== getText("Show All Frequency", language)) {
      filtered = filtered.filter(pump => pump["Frequency (Hz)"] === frequency);
    }
    if (phase && phase !== getText("Show All Phase", language)) {
      filtered = filtered.filter(pump => pump.Phase === phase);
    }
    
    // Convert user input to LPM and meters for filtering
    const flowLpm = convertFlowToLpm(flowValue, flowUnit);
    const headM = convertHeadToM(headValue, headUnit);
    
    if (flowLpm > 0) {
      filtered = filtered.filter(pump => pump["Q Rated/LPM"] >= flowLpm);
    }
    if (headM > 0) {
      filtered = filtered.filter(pump => pump["Head Rated/M"] >= headM);
    }
    if (particleSize > 0) {
      filtered = filtered.filter(pump => (pump["Pass Solid Dia(mm)"] || 0) >= particleSize);
    }
    
    // Apply percentage filter
    const maxToShow = Math.max(1, Math.floor(filtered.length * (resultPercent / 100)));
    filtered = filtered.slice(0, maxToShow);
    
    setFilteredPumps(filtered);
    setSelectedPumps([]);
    setLoading(false);
  };
  
  // Toggle pump selection
  const togglePumpSelection = (modelNo) => {
    setSelectedPumps(prev => 
      prev.includes(modelNo) 
        ? prev.filter(id => id !== modelNo)
        : [...prev, modelNo]
    );
  };
  
  // Generate curve chart data
  const generateCurveData = (modelNo) => {
    const pump = curveData.find(p => p["Model No."] === modelNo);
    if (!pump) return [];
    
    const headColumns = Object.keys(pump).filter(col => col.endsWith('M') && col !== 'Max Head(M)');
    const data = [];
    
    headColumns.forEach(col => {
      const headValue = parseFloat(col.replace('M', ''));
      const flowValue = pump[col];
      if (flowValue && flowValue > 0) {
        data.push({
          flow: convertFlowFromLpm(flowValue, flowUnit),
          head: convertHeadFromM(headValue, headUnit),
          model: modelNo
        });
      }
    });
    
    return data.sort((a, b) => a.flow - b.flow);
  };
  
  // Prepare comparison chart data
  const comparisonData = useMemo(() => {
    if (selectedPumps.length === 0) return [];
    
    const allData = [];
    selectedPumps.forEach(modelNo => {
      const pumpData = generateCurveData(modelNo);
      allData.push(...pumpData);
    });
    
    return allData;
  }, [selectedPumps, flowUnit, headUnit]);
  
  // Operating point for charts
  const operatingPoint = {
    flow: convertFlowFromLpm(convertFlowToLpm(flowValue, flowUnit), flowUnit),
    head: convertHeadFromM(convertHeadToM(headValue, headUnit), headUnit)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="https://via.placeholder.com/160x60/0057B8/FFFFFF?text=HUNG+PUMP" 
                alt="Hung Pump Logo" 
                className="h-12"
              />
              <h1 className="text-2xl font-bold text-blue-700">
                {getText("Hung Pump", language)}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="English">English</option>
                <option value="繁體中文">繁體中文</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold mb-6">{getText("Pump Selection Tool", language)}</h2>
        
        {/* Data Status */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-blue-700">
              {getText("Data loaded", language, {
                n_records: pumpData.length,
                timestamp: new Date().toLocaleString()
              })}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{getText("Refresh Data", language)}</span>
              </button>
              <button
                onClick={resetInputs}
                className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{getText("Reset Inputs", language)}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Step 1: Basic Criteria */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">{getText("Step 1", language)}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {getText("Category", language)}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{getText("All Categories", language)}</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{getText(cat, language)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {getText("Frequency", language)}
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{getText("Show All Frequency", language)}</option>
                {frequencies.map(freq => (
                  <option key={freq} value={freq}>{freq}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {getText("Phase", language)}
              </label>
              <select
                value={phase}
                onChange={(e) => setPhase(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{getText("Show All Phase", language)}</option>
                {phases.map(ph => (
                  <option key={ph} value={ph}>{ph}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Application Inputs */}
        {category === "Booster" && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">{getText("Application Input", language)}</h3>
            <p className="text-sm text-gray-600 mb-4">{getText("Floor Faucet Info", language)}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText("Number of Floors", language)}
                </label>
                <input
                  type="number"
                  min="0"
                  value={floors}
                  onChange={(e) => setFloors(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getText("Number of Faucets", language)}
                </label>
                <input
                  type="number"
                  min="0"
                  value={faucets}
                  onChange={(e) => setFaucets(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Pond Drainage */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Droplets className="w-5 h-5 mr-2 text-blue-600" />
            {getText("Pond Drainage", language)}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {getText("Pond Length", language)}
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={pondLength}
                onChange={(e) => setPondLength(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {getText("Pond Width", language)}
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={pondWidth}
                onChange={(e) => setPondWidth(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {getText("Pond Height", language)}
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={pondHeight}
                onChange={(e) => setPondHeight(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {getText("Drain Time", language)}
              </label>
              <input
                type="number"
                min="0.01"
                step="0.1"
                value={drainTime}
                onChange={(e) => setDrainTime(parseFloat(e.target.value) || 0.01)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          {pondVolume > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
              <p className="text-sm text-blue-700">
                {getText("Pond Volume", language, { volume: Math.round(pondVolume) })}
              </p>
              {pondLpm > 0 && (
                <p className="text-sm text-blue-700 mt-1">
                  {getText("Required Flow", language, { 
                    flow: Math.round(convertFlowFromLpm(pondLpm, flowUnit) * 100) / 100, 
                    unit: getText(flowUnit, language) 
                  })}
                </p>
              )}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {getText("Pump Depth", language)}
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={undergroundDepth}
                onChange={(e) => setUndergroundDepth(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {getText("Particle Size", language)}
              </label>
              <input
                type="number"
                min="0"
                step="1"
                value={particleSize}
                onChange={(e) => setParticleSize(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Manual Input */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">{getText("Manual Input", language)}</h3>
          
          {/* Flow Unit Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getText("Flow Unit", language)}
            </label>
            <div className="flex flex-wrap gap-2">
              {["L/min", "L/sec", "m³/hr", "m³/min", "US gpm"].map(unit => (
                <button
                  key={unit}
                  onClick={() => setFlowUnit(unit)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    flowUnit === unit
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {getText(unit, language)}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getText("Flow Value", language)}
            </label>
            <input
              type="number"
              min="0"
              step="10"
              value={flowValue}
              onChange={(e) => setFlowValue(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Head Unit Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getText("Head Unit", language)}
            </label>
            <div className="flex gap-2">
              {["m", "ft"].map(unit => (
                <button
                  key={unit}
                  onClick={() => setHeadUnit(unit)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    headUnit === unit
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {getText(unit, language)}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getText("TDH", language)}
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={headValue}
              onChange={(e) => setHeadValue(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Estimated Application for Booster */}
          {category === "Booster" && (flowValue > 0 || headValue > 0) && (
            <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
              <h4 className="text-sm font-semibold text-yellow-800 mb-2">
                {getText("Estimated Application", language)}
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-yellow-700">
                    {Math.round(convertHeadToM(headValue, headUnit) / 3.5)}
                  </div>
                  <div className="text-xs text-yellow-600">{getText("Estimated Floors", language)}</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-yellow-700">
                    {Math.round(convertFlowToLpm(flowValue, flowUnit) / 15)}
                  </div>
                  <div className="text-xs text-yellow-600">{getText("Estimated Faucets", language)}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Column Selection */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <button
            onClick={() => setShowColumnSelection(!showColumnSelection)}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-lg font-semibold">{getText("Column Selection", language)}</h3>
            {showColumnSelection ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          
          {showColumnSelection && (
            <div className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      {getText("Essential Columns", language)}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {essentialColumns.join(", ")}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedColumns([...optionalColumns])}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors"
                    >
                      {getText("Select All", language)}
                    </button>
                    <button
                      onClick={() => setSelectedColumns([])}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
                    >
                      {getText("Deselect All", language)}
                    </button>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    {getText("Select Columns", language)}
                  </h4>
                  <div className="max-h-40 overflow-y-auto">
                    {optionalColumns.map(col => (
                      <label key={col} className="flex items-center space-x-2 mb-1">
                        <input
                          type="checkbox"
                          checked={selectedColumns.includes(col)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedColumns(prev => [...prev, col]);
                            } else {
                              setSelectedColumns(prev => prev.filter(c => c !== col));
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{col}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Result Percentage Slider */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">{getText("Result Display", language)}</h3>
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700 min-w-0">
              {getText("Show Percentage", language)}
            </label>
            <input
              type="range"
              min="5"
              max="100"
              step="1"
              value={resultPercent}
              onChange={(e) => setResultPercent(parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm font-medium text-gray-700 min-w-0">
              {resultPercent}%
            </span>
          </div>
        </div>

        {/* Search Button */}
        <div className="mb-6">
          <button
            onClick={handleSearch}
            disabled={loading}
            className="w-full md:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <Search className="w-5 h-5" />
            )}
            <span>{getText("Search", language)}</span>
          </button>
        </div>

        {/* Results Table */}
        {filteredPumps.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">{getText("Matching Pumps", language)}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {getText("Found Pumps", language, { count: filteredPumps.length })}
            </p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Select
                    </th>
                    {essentialColumns.map(col => (
                      <th key={col} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {col}
                      </th>
                    ))}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {getText("Q Rated", language, { unit: getText(flowUnit, language) })}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {getText("Head Rated", language, { unit: getText(headUnit, language) })}
                    </th>
                    {selectedColumns.map(col => (
                      <th key={col} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPumps.map((pump, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedPumps.includes(pump["Model No."])}
                          onChange={() => togglePumpSelection(pump["Model No."])}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      {essentialColumns.map(col => (
                        <td key={col} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {pump[col]}
                        </td>
                      ))}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {Math.round(convertFlowFromLpm(pump["Q Rated/LPM"], flowUnit) * 100) / 100}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {Math.round(convertHeadFromM(pump["Head Rated/M"], headUnit) * 100) / 100}
                      </td>
                      {selectedColumns.map(col => (
                        <td key={col} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {col === "Product Link" && pump[col] ? (
                            <a 
                              href={pump[col]} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 underline"
                            >
                              {getText("View Product", language)}
                            </a>
                          ) : (
                            pump[col] || "-"
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* No Results Message */}
        {filteredPumps.length === 0 && filteredPumps !== null && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800">{getText("No Matches", language)}</p>
          </div>
        )}

        {/* Pump Curves */}
        {selectedPumps.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              {getText("Pump Curves", language)}
            </h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Selected pumps: {selectedPumps.join(", ")}
              </p>
            </div>

            {/* Performance Comparison Chart */}
            <div className="mb-8">
              <h4 className="text-md font-semibold mb-4">{getText("Multiple Curves", language)}</h4>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="flow" 
                      label={{ value: getText("Flow Rate", language, { unit: getText(flowUnit, language) }), position: 'insideBottom', offset: -10 }}
                    />
                    <YAxis 
                      label={{ value: getText("Head", language, { unit: getText(headUnit, language) }), angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                      labelFormatter={(value) => `Flow: ${value} ${getText(flowUnit, language)}`}
                      formatter={(value, name) => [`${value} ${getText(headUnit, language)}`, name]}
                    />
                    <Legend />
                    {selectedPumps.map((modelNo, index) => {
                      const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1'];
                      return (
                        <Line
                          key={modelNo}
                          type="monotone"
                          dataKey="head"
                          data={comparisonData.filter(d => d.model === modelNo)}
                          stroke={colors[index % colors.length]}
                          strokeWidth={2}
                          name={modelNo}
                          connectNulls={false}
                        />
                      );
                    })}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Operating Point Overlay */}
            {(operatingPoint.flow > 0 && operatingPoint.head > 0) && (
              <div className="mb-6">
                <h4 className="text-md font-semibold mb-4">{getText("Operating Point", language)}</h4>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="flow"
                        domain={[0, 'dataMax + 50']}
                        label={{ value: getText("Flow Rate", language, { unit: getText(flowUnit, language) }), position: 'insideBottom', offset: -10 }}
                      />
                      <YAxis 
                        dataKey="head"
                        domain={[0, 'dataMax + 10']}
                        label={{ value: getText("Head", language, { unit: getText(headUnit, language) }), angle: -90, position: 'insideLeft' }}
                      />
                      <Tooltip 
                        labelFormatter={(value) => `Flow: ${value} ${getText(flowUnit, language)}`}
                        formatter={(value) => [`${value} ${getText(headUnit, language)}`, getText("Operating Point", language)]}
                      />
                      <Legend />
                      
                      {/* Pump curves */}
                      {selectedPumps.map((modelNo, index) => {
                        const pumpCurveData = generateCurveData(modelNo);
                        const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1'];
                        return (
                          <Line
                            key={modelNo}
                            type="monotone"
                            dataKey="head"
                            data={pumpCurveData}
                            stroke={colors[index % colors.length]}
                            strokeWidth={2}
                            name={modelNo}
                          />
                        );
                      })}
                      
                      {/* Operating point */}
                      <Scatter
                        dataKey="head" 
                        data={[operatingPoint]}
                        fill="#ff0000"
                        name={getText("Operating Point", language)}
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Individual Pump Charts */}
            <div className="space-y-6">
              {selectedPumps.map(modelNo => {
                const pumpCurveData = generateCurveData(modelNo);
                if (pumpCurveData.length === 0) {
                  return (
                    <div key={modelNo} className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-600">
                        {getText("No Curve Data", language)} - {modelNo}
                      </p>
                    </div>
                  );
                }
                
                return (
                  <div key={modelNo} className="border rounded-lg p-4">
                    <h4 className="text-md font-semibold mb-4">
                      {getText("Performance Curve", language, { model: modelNo })}
                    </h4>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={pumpCurveData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="flow"
                            label={{ value: getText("Flow Rate", language, { unit: getText(flowUnit, language) }), position: 'insideBottom', offset: -10 }}
                          />
                          <YAxis 
                            label={{ value: getText("Head", language, { unit: getText(headUnit, language) }), angle: -90, position: 'insideLeft' }}
                          />
                          <Tooltip 
                            labelFormatter={(value) => `Flow: ${value} ${getText(flowUnit, language)}`}
                            formatter={(value) => [`${value} ${getText(headUnit, language)}`, 'Head']}
                          />
                          <Line
                            type="monotone"
                            dataKey="head"
                            stroke="#8884d8"
                            strokeWidth={3}
                            dot={{ r: 6 }}
                            name={modelNo}
                          />
                          {/* Operating point if within range */}
                          {(operatingPoint.flow > 0 && operatingPoint.head > 0) && (
                            <Scatter
                              dataKey="head"
                              data={[operatingPoint]}
                              fill="#ff0000"
                              shape="star"
                              name={getText("Operating Point", language)}
                            />
                          )}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PumpSelectionApp;
