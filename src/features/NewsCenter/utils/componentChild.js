import BusinessAnalysis from "../tabs/AnalyzeReport/BusinessAnalysis";
import IndustryAnalysis from "../tabs/AnalyzeReport/IndustryAnalysis";
import MarketPulse from "../tabs/AnalyzeReport/MarketPulse";
import DomesticMacro from "../tabs/MacroNews/DomesticMacro";
import ForeignMacro from "../tabs/MacroNews/ForeignMacro";

export const hashTbMarco = {
  "Vĩ mô trong nước": DomesticMacro,
  "Vĩ mô thế giới": ForeignMacro,
};

export const hashTbAnalyzeReport = {
  "Phân tích doanh nghiệp": BusinessAnalysis,
  "Nhịp đập thị trường": MarketPulse,
  "Phân tích ngành": IndustryAnalysis,
};
