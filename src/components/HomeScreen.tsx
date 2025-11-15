import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  Wrench, 
  MapPin, 
  Search, 
  Bell, 
  Menu,
  Plus,
  User
} from 'lucide-react';
import { UserRole, Job } from '../App';

interface HomeScreenProps {
  userRole: UserRole;
  userName: string;
  onNavigate: (screen: 'map' | 'post-job' | 'profile' | 'notifications' | 'sidebar' | 'services') => void;
  onJobSelect: (job: Job) => void;
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'Tech Solutions Inc',
    location: 'Mumbai, Maharashtra',
    salary: '₹8-12 LPA',
    type: 'Full-time',
    description: 'Looking for React developer',
    requirements: ['React', 'TypeScript', 'Tailwind'],
    postedDate: '2 days ago',
    status: 'approved',
  },
  {
    id: '2',
    title: 'Graphic Designer',
    company: 'Creative Studio',
    location: 'Delhi, India',
    salary: '₹5-8 LPA',
    type: 'Full-time',
    description: 'Need experienced designer',
    requirements: ['Figma', 'Photoshop', 'Illustrator'],
    postedDate: '1 week ago',
    status: 'approved',
  },
  {
    id: '3',
    title: 'Marketing Manager',
    company: 'Brand Builders',
    location: 'Bangalore, Karnataka',
    salary: '₹10-15 LPA',
    type: 'Full-time',
    description: 'Lead marketing team',
    requirements: ['5+ years exp', 'Digital Marketing', 'Team Management'],
    postedDate: '3 days ago',
    status: 'approved',
  },
  {
    id: '4',
    title: 'Backend Developer',
    company: 'DataTech Corp',
    location: 'Pune, Maharashtra',
    salary: '₹9-14 LPA',
    type: 'Full-time',
    description: 'Node.js backend developer needed',
    requirements: ['Node.js', 'MongoDB', 'Express'],
    postedDate: '4 days ago',
    status: 'approved',
  },
  {
    id: '5',
    title: 'UI/UX Designer',
    company: 'Design Hub',
    location: 'Mumbai, Maharashtra',
    salary: '₹6-10 LPA',
    type: 'Full-time',
    description: 'Creative UI/UX designer wanted',
    requirements: ['Figma', 'Sketch', 'User Research'],
    postedDate: '5 days ago',
    status: 'approved',
  },
  {
    id: '6',
    title: 'Data Analyst',
    company: 'Analytics Pro',
    location: 'Hyderabad, Telangana',
    salary: '₹7-11 LPA',
    type: 'Full-time',
    description: 'Data analysis and visualization expert',
    requirements: ['Python', 'SQL', 'Tableau'],
    postedDate: '1 week ago',
    status: 'approved',
  },
  {
    id: '7',
    title: 'DevOps Engineer',
    company: 'Cloud Systems',
    location: 'Bangalore, Karnataka',
    salary: '₹12-18 LPA',
    type: 'Full-time',
    description: 'Experienced DevOps engineer',
    requirements: ['AWS', 'Docker', 'Kubernetes'],
    postedDate: '3 days ago',
    status: 'approved',
  },
  {
    id: '8',
    title: 'Content Writer',
    company: 'Media House',
    location: 'Delhi, India',
    salary: '₹4-6 LPA',
    type: 'Full-time',
    description: 'Creative content writer',
    requirements: ['SEO', 'Blog Writing', 'Research'],
    postedDate: '2 days ago',
    status: 'approved',
  },
  {
    id: '9',
    title: 'Sales Executive',
    company: 'Sales Masters',
    location: 'Mumbai, Maharashtra',
    salary: '₹3-5 LPA + Incentives',
    type: 'Full-time',
    description: 'Dynamic sales professional needed',
    requirements: ['Communication', 'Sales Experience', 'Client Management'],
    postedDate: '1 day ago',
    status: 'approved',
  },
  {
    id: '10',
    title: 'HR Manager',
    company: 'People First',
    location: 'Pune, Maharashtra',
    salary: '₹8-12 LPA',
    type: 'Full-time',
    description: 'HR manager for growing company',
    requirements: ['HR Management', 'Recruitment', 'Employee Relations'],
    postedDate: '6 days ago',
    status: 'approved',
  },
];

const serviceKeywords = [
  'Plumber', 'Electrician', 'Carpenter', 'Painter', 'Home Cleaning', 'Mechanic', 'Salon', 'Photographer',
  'Tap Repair', 'Pipe Fitting', 'Tank Cleaning', 'Bathroom Fitting', 'Drainage Cleaning', 'Leak Repair',
  'Wiring Repair', 'Switch Installation', 'Fan Installation', 'Light Fitting', 'AC Installation', 'MCB Repair',
  'Furniture Repair', 'Door Fitting', 'Cabinet Making', 'Bed Repair', 'Window Repair', 'Custom Furniture',
  'Wall Painting', 'Exterior Painting', 'Texture Painting', 'Waterproofing', 'Polish Work', 'Stencil Art',
  'Deep Cleaning', 'Bathroom Cleaning', 'Kitchen Cleaning', 'Sofa Cleaning', 'Carpet Cleaning', 'Pest Control',
  'Bike Service', 'Car Service', 'Oil Change', 'Tire Replacement', 'AC Repair', 'General Checkup',
  'Haircut', 'Hair Coloring', 'Facial', 'Manicure', 'Massage', 'Makeup',
  'Event Photography', 'Portrait Shoot', 'Product Photography', 'Wedding Photography', 'Video Shoot', 'Drone Photography'
];

export function HomeScreen({ userRole, userName, onNavigate, onJobSelect }: HomeScreenProps) {
  const [activeTab, setActiveTab] = useState<'jobs' | 'services'>('jobs');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter jobs based on search
  const filteredJobs = mockJobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.requirements.some(req => req.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Filter services based on search
  const filteredServices = serviceKeywords.filter(service =>
    service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Determine which results to show
  const showJobResults = searchQuery && filteredJobs.length > 0;
  const showServiceResults = searchQuery && filteredServices.length > 0;

  return (
    <div className="h-full w-full bg-[#0A0F1C] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#141A2A] to-[#0A0F1C] px-4 py-4 pb-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('profile')}
              className="w-10 h-10 rounded-full bg-[#007BFF] flex items-center justify-center"
            >
              <User className="w-5 h-5 text-white" />
            </button>
            <div>
              <p className="text-gray-400 text-sm">Welcome back,</p>
              <p className="text-white">{userName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onNavigate('notifications')}
              className="w-10 h-10 rounded-full bg-[#141A2A] flex items-center justify-center relative hover:bg-[#1A2332] transition-all"
            >
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#007BFF] rounded-full"></span>
            </button>
            <button 
              onClick={() => onNavigate('sidebar')}
              className="w-10 h-10 rounded-full bg-[#141A2A] flex items-center justify-center hover:bg-[#1A2332] transition-all"
            >
              <Menu className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-[#141A2A] rounded-2xl p-3 flex items-center gap-3 mb-4">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search jobs, services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-white outline-none placeholder-gray-500"
          />
          <button 
            onClick={() => onNavigate('map')}
            className="p-2 bg-[#007BFF] rounded-xl"
          >
            <MapPin className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex-1 py-3 rounded-t-2xl flex items-center justify-center gap-2 transition-all ${
              activeTab === 'jobs'
                ? 'bg-[#0A0F1C] text-white'
                : 'bg-transparent text-gray-400'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Jobs</span>
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`flex-1 py-3 rounded-t-2xl flex items-center justify-center gap-2 transition-all ${
              activeTab === 'services'
                ? 'bg-[#0A0F1C] text-white'
                : 'bg-transparent text-gray-400'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Services</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Search Results */}
        {searchQuery && (
          <div className="mb-4">
            <p className="text-gray-400 text-sm mb-3">
              Search results for "{searchQuery}"
            </p>
            
            {/* Job Results */}
            {showJobResults && (
              <div className="mb-4">
                <h3 className="text-white mb-2 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Jobs ({filteredJobs.length})
                </h3>
                <div className="space-y-2">
                  {filteredJobs.slice(0, 3).map((job) => (
                    <button
                      key={job.id}
                      onClick={() => onJobSelect(job)}
                      className="w-full bg-[#141A2A] rounded-xl p-3 text-left hover:bg-[#1A2332] transition-all border border-[#007BFF]/20"
                    >
                      <h4 className="text-white text-sm mb-1">{job.title}</h4>
                      <p className="text-gray-400 text-xs">{job.company}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Service Results */}
            {showServiceResults && (
              <div className="mb-4">
                <h3 className="text-white mb-2 flex items-center gap-2">
                  <Wrench className="w-4 h-4" />
                  Services ({filteredServices.length})
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {filteredServices.slice(0, 6).map((service) => (
                    <button
                      key={service}
                      onClick={() => {
                        setActiveTab('services');
                        setSearchQuery('');
                        onNavigate('services');
                      }}
                      className="bg-[#141A2A] rounded-xl p-3 text-left hover:bg-[#1A2332] transition-all border border-[#007BFF]/20"
                    >
                      <p className="text-white text-sm">{service}</p>
                      <p className="text-gray-400 text-xs">Available</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!showJobResults && !showServiceResults && (
              <div className="text-center py-8">
                <p className="text-gray-400">No results found</p>
              </div>
            )}
          </div>
        )}

        {/* Default Content */}
        {!searchQuery && activeTab === 'jobs' && (
          <div className="space-y-3">
            {mockJobs.map((job, index) => (
              <motion.button
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onJobSelect(job)}
                className="w-full bg-[#141A2A] rounded-2xl p-4 text-left hover:bg-[#1A2332] transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-white mb-1">{job.title}</h3>
                    <p className="text-gray-400 text-sm">{job.company}</p>
                  </div>
                  <span className="text-[#007BFF] text-sm bg-[#007BFF]/10 px-3 py-1 rounded-full">
                    {job.type}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </span>
                  <span>{job.salary}</span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Posted {job.postedDate}
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {!searchQuery && activeTab === 'services' && (
          <div className="space-y-3">
            {['Plumber', 'Electrician', 'Carpenter', 'Painter', 'Home Cleaning', 'Mechanic', 'Salon at Home', 'Photographer'].map((service, index) => (
              <motion.button
                key={service}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onNavigate('services')}
                className="w-full bg-[#141A2A] rounded-2xl p-4 text-left hover:bg-[#1A2332] transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#007BFF]/10 flex items-center justify-center">
                      <Wrench className="w-6 h-6 text-[#007BFF]" />
                    </div>
                    <div>
                      <h3 className="text-white mb-1">{service}</h3>
                      <p className="text-gray-400 text-sm">50+ providers nearby</p>
                    </div>
                  </div>
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      {userRole === 'company' && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => onNavigate('post-job')}
          className="absolute bottom-6 right-6 w-14 h-14 bg-[#007BFF] rounded-full flex items-center justify-center shadow-lg shadow-[#007BFF]/30"
        >
          <Plus className="w-6 h-6 text-white" />
        </motion.button>
      )}
    </div>
  );
}