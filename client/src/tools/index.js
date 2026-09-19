import WordCounter from './WordCounter.jsx';
import CaseConverter from './CaseConverter.jsx';
import LoremIpsum from './LoremIpsum.jsx';
import PercentageCalculator from './PercentageCalculator.jsx';
import BmiCalculator from './BmiCalculator.jsx';
import TipCalculator from './TipCalculator.jsx';
import AgeCalculator from './AgeCalculator.jsx';
import JsonFormatter from './JsonFormatter.jsx';
import TimestampConverter from './TimestampConverter.jsx';
import PasswordGenerator from './PasswordGenerator.jsx';
import UuidGenerator from './UuidGenerator.jsx';
import ColorConverter from './ColorConverter.jsx';
import QrCodeGenerator from './QrCodeGenerator.jsx';

export const widgetRegistry = {
  'word-counter': WordCounter,
  'case-converter': CaseConverter,
  'lorem-ipsum': LoremIpsum,
  'percentage-calculator': PercentageCalculator,
  'bmi-calculator': BmiCalculator,
  'tip-calculator': TipCalculator,
  'age-calculator': AgeCalculator,
  'json-formatter': JsonFormatter,
  'timestamp-converter': TimestampConverter,
  'password-generator': PasswordGenerator,
  'uuid-generator': UuidGenerator,
  'color-converter': ColorConverter,
  'qr-code-generator': QrCodeGenerator
};
