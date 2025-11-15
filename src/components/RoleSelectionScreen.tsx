import { motion } from 'motion/react';
import { Briefcase, Building2, Wrench, User } from 'lucide-react';
import { UserRole } from '../App';

interface RoleSelectionScreenProps {
  onRoleSelect: (role: UserRole) => void;
}

const roles = [
  {
    id: 'job-seeker' as UserRole,
    icon: Briefcase,
    title: 'Job Seeker',
    description: 'Looking for employment opportunities',
    color: '#007BFF',
  },
  {
    id: 'company' as UserRole,
    icon: Building2,
    title: 'Company',
    description: 'Hiring talented professionals',
    color: '#00D9FF',
  },
  {
    id: 'service-provider' as UserRole,
    icon: Wrench,
    title: 'Service Provider',
    description: 'Offering instant services',
    color: '#00FFA3',
  },
  {
    id: 'customer' as UserRole,
    icon: User,
    title: 'Customer',
    description: 'Need services or accommodations',
    color: '#FF6B00',
  },
];

export function RoleSelectionScreen({ onRoleSelect }: RoleSelectionScreenProps) {
  return (
    <div className="h-full w-full bg-gradient-to-b from-[#0A0F1C] to-[#141A2A] flex flex-col">
      {/* Header */}
      <div className="p-6 text-center">
        <h1 className="text-white text-2xl mb-2">Select Your Role</h1>
        <p className="text-gray-400">Choose how you want to use Kaam Milega</p>
      </div>

      {/* Roles Grid */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          {roles.map((role, index) => (
            <motion.button
              key={role.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onRoleSelect(role.id)}
              className="bg-[#141A2A] rounded-2xl p-6 flex flex-col items-center text-center hover:bg-[#1A2332] transition-all active:scale-95"
              style={{
                boxShadow: `0 0 20px ${role.color}20`,
              }}
            >
              <div
                className="p-4 rounded-2xl mb-4"
                style={{ backgroundColor: `${role.color}20` }}
              >
                <role.icon className="w-10 h-10" style={{ color: role.color }} strokeWidth={1.5} />
              </div>
              <h3 className="text-white mb-2">{role.title}</h3>
              <p className="text-gray-400 text-sm leading-tight">{role.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 text-center">
        <p className="text-gray-500 text-sm">
          You can switch roles anytime from settings
        </p>
      </div>
    </div>
  );
}
