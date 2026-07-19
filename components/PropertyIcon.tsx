import {
  FaBed,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCheckCircle,
  FaExclamationCircle,
  FaClock,
} from 'react-icons/fa';

interface Props {
  name: 'beds' | 'location' | 'date' | 'complete' | 'active' | 'issues';
}

const iconMap = {
  beds: FaBed,
  location: FaMapMarkerAlt,
  date: FaCalendarAlt,
  complete: FaCheckCircle,
  active: FaClock,
  issues: FaExclamationCircle,
};

const PropertyIcon = ({ name }: Props) => {
  const Icon = iconMap[name];
  return <Icon className="mr-2 inline h-4 w-4 text-slate-400" />;
};

export default PropertyIcon;
