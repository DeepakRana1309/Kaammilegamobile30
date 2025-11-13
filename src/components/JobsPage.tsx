import { User, Search, MapPin, Briefcase, IndianRupee, Clock, Crown, Filter, ChevronDown, X, ChevronUp, ArrowUpDown, Navigation, TrendingUp, Bookmark } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface JobsPageProps {
  onJobClick: (job: any) => void;
  onProfileClick: () => void;
  onPremiumClick: () => void;
}

// Comprehensive Job Titles from LinkedIn, Naukri, Indeed, etc.
const allJobTitles = [
  // Technology & Software Development
  'Software Engineer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
  'Mobile App Developer', 'iOS Developer', 'Android Developer', 'React Developer',
  'Angular Developer', 'Vue.js Developer', 'Node.js Developer', 'Python Developer',
  'Java Developer', 'C++ Developer', 'PHP Developer', 'Ruby Developer',
  'DevOps Engineer', 'Cloud Engineer', 'AWS Developer', 'Azure Developer',
  'Solutions Architect', 'Technical Architect', 'Software Architect',
  'Machine Learning Engineer', 'AI Engineer', 'Data Scientist', 'Data Engineer',
  'Data Analyst', 'Business Intelligence Analyst', 'Database Administrator',
  'Quality Assurance Engineer', 'QA Tester', 'Automation Tester', 'SDET',
  'Cybersecurity Analyst', 'Security Engineer', 'Penetration Tester',
  'Blockchain Developer', 'Smart Contract Developer', 'Web3 Developer',
  'Game Developer', 'Unity Developer', 'Unreal Engine Developer',
  'Embedded Systems Engineer', 'IoT Developer', 'Firmware Engineer',
  
  // Design & Creative
  'UI/UX Designer', 'Product Designer', 'Visual Designer', 'Graphic Designer',
  'Web Designer', 'Motion Graphics Designer', 'Video Editor', '3D Artist',
  'Illustrator', 'Brand Designer', 'Creative Director', 'Art Director',
  'User Researcher', 'UX Researcher', 'Interaction Designer',
  
  // Product & Project Management
  'Product Manager', 'Senior Product Manager', 'Associate Product Manager',
  'Product Owner', 'Project Manager', 'Program Manager', 'Scrum Master',
  'Agile Coach', 'Delivery Manager', 'Technical Project Manager',
  
  // Marketing & Sales
  'Digital Marketing Manager', 'Marketing Manager', 'Brand Manager',
  'Social Media Manager', 'Content Marketing Manager', 'SEO Specialist',
  'SEM Specialist', 'Performance Marketing Manager', 'Growth Manager',
  'Marketing Analyst', 'Email Marketing Specialist', 'Content Writer',
  'Copywriter', 'Technical Writer', 'Content Strategist',
  'Sales Manager', 'Business Development Manager', 'Account Manager',
  'Sales Executive', 'Inside Sales Representative', 'Key Account Manager',
  'Channel Sales Manager', 'Regional Sales Manager',
  
  // Business & Strategy
  'Business Analyst', 'Strategy Consultant', 'Management Consultant',
  'Operations Manager', 'Operations Analyst', 'Supply Chain Manager',
  'Logistics Manager', 'Procurement Manager', 'Vendor Manager',
  
  // Finance & Accounting
  'Financial Analyst', 'Investment Banker', 'Equity Research Analyst',
  'Chartered Accountant', 'Accountant', 'Tax Consultant', 'Auditor',
  'Finance Manager', 'Treasury Analyst', 'Risk Analyst',
  'Credit Analyst', 'Portfolio Manager', 'Wealth Manager',
  
  // Human Resources
  'HR Manager', 'Human Resources Manager', 'Talent Acquisition Specialist',
  'Recruiter', 'Technical Recruiter', 'HR Business Partner',
  'Learning & Development Manager', 'Training Manager', 'HR Generalist',
  'Compensation & Benefits Analyst', 'Employee Relations Manager',
  
  // Customer Service & Support
  'Customer Success Manager', 'Customer Support Executive',
  'Technical Support Engineer', 'Customer Service Representative',
  'Client Relations Manager', 'Account Support Specialist',
  
  // Legal & Compliance
  'Legal Counsel', 'Corporate Lawyer', 'Compliance Officer',
  'Legal Advisor', 'Contract Manager', 'Paralegal',
  
  // Healthcare & Medical
  'Doctor', 'Physician', 'Surgeon', 'Nurse', 'Medical Officer',
  'Pharmacist', 'Clinical Research Associate', 'Healthcare Consultant',
  'Medical Representative', 'Hospital Administrator',
  
  // Education & Training
  'Teacher', 'Professor', 'Lecturer', 'Academic Coordinator',
  'Instructional Designer', 'Corporate Trainer', 'Faculty Member',
  
  // Engineering (Non-Software)
  'Mechanical Engineer', 'Electrical Engineer', 'Civil Engineer',
  'Chemical Engineer', 'Production Engineer', 'Quality Engineer',
  'Manufacturing Engineer', 'Automation Engineer', 'Process Engineer',
  
  // Retail & E-commerce
  'E-commerce Manager', 'Merchandising Manager', 'Category Manager',
  'Store Manager', 'Retail Manager', 'Inventory Manager',
  
  // Media & Communications
  'Public Relations Manager', 'Communications Manager', 'Journalist',
  'Editor', 'Social Media Coordinator', 'Community Manager',
  
  // Entry Level & Internships
  'Intern', 'Management Trainee', 'Graduate Trainee', 'Associate',
  'Junior Developer', 'Assistant Manager', 'Fresher - Any Graduate',
  
  // Remote & Freelance
  'Remote Software Developer', 'Freelance Designer', 'Virtual Assistant',
  'Remote Content Writer', 'Online Tutor', 'Remote Customer Support',
  
  // Specialized Roles
  'Blockchain Analyst', 'NFT Developer', 'AR/VR Developer',
  'Robotics Engineer', 'Drone Pilot', 'Sustainability Consultant',
  'ESG Analyst', 'Chief Technology Officer', 'Chief Marketing Officer',
  'Chief Financial Officer', 'Startup Founder', 'Entrepreneur'
];

const allJobs = [
  {
    id: 10,
    title: 'Senior Backend Developer',
    company: 'Google India',
    salary: 30,
    salaryRange: '₹25-35 LPA',
    location: 'Bangalore, Karnataka',
    time: '30 min ago',
    type: 'Full-time',
    hot: true,
    experience: '5-10 years',
    bookmarked: false
  },
  {
    id: 11,
    title: 'Marketing Manager',
    company: 'Amazon',
    salary: 17.5,
    salaryRange: '₹15-20 LPA',
    location: 'Mumbai, Maharashtra',
    time: '1h ago',
    type: 'Full-time',
    hot: true,
    experience: '2-5 years',
    bookmarked: true
  },
  {
    id: 12,
    title: 'Flutter Developer',
    company: 'Flipkart',
    salary: 14,
    salaryRange: '₹10-18 LPA',
    location: 'Bangalore, Karnataka',
    time: '2h ago',
    type: 'Hybrid',
    hot: false,
    experience: '2-5 years',
    bookmarked: false
  },
  {
    id: 13,
    title: 'DevOps Engineer',
    company: 'Microsoft',
    salary: 23,
    salaryRange: '₹18-28 LPA',
    location: 'Hyderabad, Telangana',
    time: '3h ago',
    type: 'Internship',
    hot: true,
    experience: '1-2 years',
    bookmarked: true
  },
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'Tech Solutions Ltd',
    salary: 8,
    salaryRange: '₹6-10 LPA',
    location: 'Mumbai, Maharashtra',
    time: '2h ago',
    type: 'Full-time',
    hot: false,
    experience: '1-2 years',
    bookmarked: false
  },
  {
    id: 2,
    title: 'UI/UX Designer',
    company: 'Creative Studios',
    salary: 6.5,
    salaryRange: '₹5-8 LPA',
    location: 'Bangalore, Karnataka',
    time: '5h ago',
    type: 'Remote',
    hot: false,
    experience: '2-5 years',
    bookmarked: false
  },
  {
    id: 3,
    title: 'Data Analyst',
    company: 'Analytics Corp',
    salary: 9.5,
    salaryRange: '₹7-12 LPA',
    location: 'Pune, Maharashtra',
    time: '1d ago',
    type: 'Contract',
    hot: false,
    experience: '1-2 years',
    bookmarked: true
  },
  {
    id: 4,
    title: 'React Developer',
    company: 'StartupHub Inc',
    salary: 11.5,
    salaryRange: '₹8-15 LPA',
    location: 'Hyderabad, Telangana',
    time: '3h ago',
    type: 'Hybrid',
    hot: false,
    experience: '2-5 years',
    bookmarked: false
  },
  {
    id: 5,
    title: 'Product Designer',
    company: 'Design First',
    salary: 7.5,
    salaryRange: '₹6-9 LPA',
    location: 'Delhi NCR',
    time: '6h ago',
    type: 'Part-time',
    hot: false,
    experience: 'Fresher',
    bookmarked: false
  }
];

export function JobsPage({ onJobClick, onProfileClick, onPremiumClick }: JobsPageProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [animateText, setAnimateText] = useState(true);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [userLocation, setUserLocation] = useState('Mumbai, Maharashtra');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [currentSort, setCurrentSort] = useState<'latest' | 'salary-high' | 'salary-low' | 'distance' | 'relevant'>('latest');
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Filter states (temporary until apply is clicked)
  const [tempSelectedJobType, setTempSelectedJobType] = useState<string[]>([]);
  const [tempSalaryRange, setTempSalaryRange] = useState<[number, number]>([0, 10]);
  const [tempExperienceLevel, setTempExperienceLevel] = useState<string[]>([]);
  const [tempShowBookmarked, setTempShowBookmarked] = useState(false);
  
  // Applied filter states
  const [selectedJobType, setSelectedJobType] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 10]);
  const [experienceLevel, setExperienceLevel] = useState<string[]>([]);
  const [showBookmarked, setShowBookmarked] = useState(false);

  // Filtered and sorted jobs
  const [displayedJobs, setDisplayedJobs] = useState(allJobs);

  // User info animation
  const userName = "Rahul Sharma";

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateText(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Filter and sort jobs whenever filters or sort changes
  useEffect(() => {
    let filtered = [...allJobs];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply job type filter
    if (selectedJobType.length > 0) {
      filtered = filtered.filter(job => selectedJobType.includes(job.type));
    }

    // Apply salary range filter
    filtered = filtered.filter(job => job.salary >= salaryRange[0] && job.salary <= salaryRange[1]);

    // Apply experience filter
    if (experienceLevel.length > 0) {
      filtered = filtered.filter(job => experienceLevel.includes(job.experience));
    }

    // Apply bookmark filter
    if (showBookmarked) {
      filtered = filtered.sort((a, b) => (b.bookmarked ? 1 : 0) - (a.bookmarked ? 1 : 0));
    }

    // Apply sorting
    switch (currentSort) {
      case 'salary-high':
        filtered.sort((a, b) => b.salary - a.salary);
        break;
      case 'salary-low':
        filtered.sort((a, b) => a.salary - b.salary);
        break;
      case 'distance':
        // In production, calculate actual distance
        filtered.sort((a, b) => a.location.localeCompare(b.location));
        break;
      case 'relevant':
        // In production, use ML-based relevance
        filtered.sort((a, b) => (b.hot ? 1 : 0) - (a.hot ? 1 : 0));
        break;
      case 'latest':
      default:
        // Keep default order (already sorted by time)
        break;
    }

    setDisplayedJobs(filtered);
  }, [searchQuery, selectedJobType, salaryRange, experienceLevel, showBookmarked, currentSort]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setShowSearchSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const jobTypes = ['Full-time', 'Part-time', 'Remote', 'Hybrid', 'Contract', 'Internship'];
  const experiences = ['Fresher', '1-2 years', '2-5 years', '5-10 years', '10+ years'];

  const sortOptions = [
    { id: 'latest', label: 'Latest Jobs', icon: Clock },
    { id: 'salary-high', label: 'Salary: High to Low', icon: TrendingUp },
    { id: 'salary-low', label: 'Salary: Low to High', icon: IndianRupee },
    { id: 'distance', label: 'Distance: Nearest', icon: MapPin },
    { id: 'relevant', label: 'Most Relevant', icon: Briefcase }
  ];

  const handleLocationAllow = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          alert('Location fetched! (In production, this will use Google Maps API)');
          setUserLocation('Your Current Location');
          setShowLocationPicker(false);
        },
        (error) => {
          alert('Please enable location services');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  const toggleTempFilter = (array: string[], setArray: (val: string[]) => void, value: string) => {
    if (array.includes(value)) {
      setArray(array.filter(item => item !== value));
    } else {
      setArray([...array, value]);
    }
  };

  const applyFilters = () => {
    setSelectedJobType(tempSelectedJobType);
    setSalaryRange(tempSalaryRange);
    setExperienceLevel(tempExperienceLevel);
    setShowBookmarked(tempShowBookmarked);
    setShowFilters(false);
  };

  const clearAllFilters = () => {
    setTempSelectedJobType([]);
    setTempSalaryRange([0, 10]);
    setTempExperienceLevel([]);
    setTempShowBookmarked(false);
    setSelectedJobType([]);
    setSalaryRange([0, 10]);
    setExperienceLevel([]);
    setShowBookmarked(false);
  };

  const activeFiltersCount = selectedJobType.length + experienceLevel.length + (salaryRange[0] > 0 || salaryRange[1] < 10 ? 1 : 0) + (showBookmarked ? 1 : 0);

  const getJobTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'Full-time': 'from-blue-500 to-blue-700',
      'Part-time': 'from-green-500 to-green-700',
      'Remote': 'from-purple-500 to-purple-700',
      'Hybrid': 'from-purple-500 to-purple-700',
      'Contract': 'from-orange-500 to-orange-700',
      'Internship': 'from-green-500 to-green-700'
    };
    return colors[type] || 'from-blue-500 to-blue-700';
  };

  // Filter job suggestions based on search query
  const filteredJobTitles = allJobTitles.filter(job =>
    job.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 8);

  const handleSearchSelect = (jobTitle: string) => {
    setSearchQuery(jobTitle);
    setShowSearchSuggestions(false);
  };

  const handleSortSelect = (sortId: string) => {
    setCurrentSort(sortId as any);
    setShowSortMenu(false);
  };

  return (
    <div className="min-h-full bg-[#0A0F1C] text-white pb-6 relative">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header with Animation */}
        <div className="px-5 pt-6 pb-4 flex items-start justify-between">
          <div className="flex-1 overflow-hidden">
            <h1 className="text-2xl mb-1">Kaam Milega</h1>
            <div className="h-5 relative overflow-hidden">
              <div 
                className={`transition-all duration-500 ${
                  animateText ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                }`}
                style={{ position: 'absolute', width: '100%' }}
              >
                <p className="text-gray-400 text-sm flex items-center gap-1.5">
                  <span className="text-[#007BFF]">👋</span>
                  Hi, {userName}
                </p>
              </div>
              <div 
                className={`transition-all duration-500 ${
                  !animateText ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
                style={{ position: 'absolute', width: '100%' }}
              >
                <button 
                  onClick={() => setShowLocationPicker(true)}
                  className="text-gray-400 text-sm flex items-center gap-1.5 hover:text-[#007BFF] transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#007BFF]" />
                  {userLocation}
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={onPremiumClick}
              className="bg-gradient-to-r from-yellow-500 to-orange-600 p-2.5 rounded-full hover:shadow-xl hover:shadow-yellow-500/20 transition-all relative transform hover:scale-105"
            >
              <Crown className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
            </button>
            <button 
              onClick={onProfileClick}
              className="bg-[#141A2A] p-2.5 rounded-full border border-[#1f2937] hover:border-[#007BFF] transition-all transform hover:scale-105"
            >
              <User className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Location Picker Modal */}
        {showLocationPicker && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end">
            <div className="w-full max-w-[390px] mx-auto bg-[#141A2A] rounded-t-3xl p-6 animate-in slide-in-from-bottom">
              <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-4"></div>
              <h3 className="text-white text-lg mb-4">Set Your Location</h3>
              
              <button
                onClick={handleLocationAllow}
                className="w-full bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white py-3 rounded-xl mb-3 hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-5 h-5" />
                Allow Location Access
              </button>

              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Enter location manually..."
                  className="w-full bg-[#0A0F1C] text-white px-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value) {
                      setUserLocation(e.currentTarget.value);
                      setShowLocationPicker(false);
                    }
                  }}
                />
                <p className="text-gray-500 text-xs mt-2">In production: Google Places API will provide autocomplete</p>
              </div>

              <button
                onClick={() => setShowLocationPicker(false)}
                className="w-full bg-[#0A0F1C] text-gray-400 py-3 rounded-xl hover:bg-[#1f2937] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Search Bar with Suggestions, Filter & Sort */}
        <div className="px-5 mb-6">
          <div className="flex gap-2">
            {/* Search Bar with Dropdown */}
            <div className="relative flex-1" ref={searchInputRef}>
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
              <input
                type="text"
                placeholder="Search job title or keyword"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchSuggestions(true);
                }}
                onFocus={() => setShowSearchSuggestions(true)}
                className="w-full bg-gradient-to-r from-[#141A2A] to-[#1a2234] backdrop-blur-xl text-white pl-12 pr-4 py-3 rounded-xl border border-[#1f2937] focus:border-[#007BFF] focus:outline-none transition-colors shadow-lg"
                style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.25)' }}
              />

              {/* Search Suggestions Dropdown */}
              {showSearchSuggestions && searchQuery && filteredJobTitles.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#141A2A] rounded-xl border border-[#007BFF] shadow-2xl max-h-80 overflow-y-auto z-50 animate-in slide-in-from-top">
                  {filteredJobTitles.map((jobTitle, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearchSelect(jobTitle)}
                      className="w-full text-left px-4 py-3 hover:bg-[#007BFF]/10 transition-colors border-b border-[#1f2937] last:border-b-0 flex items-center gap-3"
                    >
                      <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-white text-sm">{jobTitle}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sort Button with Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="px-4 py-3 rounded-xl border border-[#1f2937] bg-[#141A2A] text-gray-400 hover:border-[#007BFF] hover:text-white transition-all flex items-center gap-2"
              >
                <ArrowUpDown className="w-5 h-5" />
                <span className="text-sm">Sort</span>
              </button>

              {/* Sort Dropdown Menu */}
              {showSortMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-[#141A2A] rounded-xl border border-[#007BFF] shadow-2xl overflow-hidden z-50 animate-in slide-in-from-top">
                  {sortOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleSortSelect(option.id)}
                        className={`w-full text-left px-4 py-3 hover:bg-[#007BFF]/10 transition-colors border-b border-[#1f2937] last:border-b-0 flex items-center gap-3 ${
                          currentSort === option.id ? 'bg-[#007BFF]/10 text-[#007BFF]' : 'text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{option.label}</span>
                        {currentSort === option.id && (
                          <span className="ml-auto text-[#007BFF]">✓</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Filter Button */}
            <button 
              onClick={() => {
                setShowFilters(!showFilters);
                // Load current applied filters into temp
                if (!showFilters) {
                  setTempSelectedJobType(selectedJobType);
                  setTempSalaryRange(salaryRange);
                  setTempExperienceLevel(experienceLevel);
                  setTempShowBookmarked(showBookmarked);
                }
              }}
              className={`relative px-4 py-3 rounded-xl border transition-all ${
                showFilters || activeFiltersCount > 0
                  ? 'bg-[#007BFF] border-[#007BFF] text-white shadow-lg shadow-blue-500/30'
                  : 'bg-[#141A2A] border-[#1f2937] text-gray-400 hover:border-[#007BFF]'
              }`}
            >
              <Filter className="w-5 h-5" />
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center animate-pulse">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="px-5 mb-6 animate-in slide-in-from-top">
            <div className="bg-gradient-to-br from-[#141A2A] to-[#1a2234] rounded-2xl border border-[#1f2937] p-5 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white">Filters</h3>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={clearAllFilters}
                    className="text-red-400 text-sm hover:underline"
                  >
                    Clear All
                  </button>
                  <button 
                    onClick={() => setShowFilters(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Bookmark Filter */}
              <div className="mb-5">
                <button
                  onClick={() => setTempShowBookmarked(!tempShowBookmarked)}
                  className={`w-full px-4 py-3 rounded-xl text-sm border transition-all flex items-center gap-2 ${
                    tempShowBookmarked
                      ? 'bg-[#007BFF] border-[#007BFF] text-white shadow-lg shadow-blue-500/30'
                      : 'bg-[#0A0F1C] border-[#1f2937] text-gray-400 hover:border-[#007BFF]'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${tempShowBookmarked ? 'fill-current' : ''}`} />
                  <span>Show Bookmarked Jobs First</span>
                </button>
              </div>

              {/* Job Type Filter */}
              <div className="mb-5">
                <h4 className="text-gray-400 text-sm mb-2">Job Type</h4>
                <div className="flex flex-wrap gap-2">
                  {jobTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => toggleTempFilter(tempSelectedJobType, setTempSelectedJobType, type)}
                      className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                        tempSelectedJobType.includes(type)
                          ? 'bg-[#007BFF] border-[#007BFF] text-white shadow-lg shadow-blue-500/30'
                          : 'bg-[#0A0F1C] border-[#1f2937] text-gray-400 hover:border-[#007BFF]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Salary Range */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-gray-400 text-sm">Salary Range (LPA)</h4>
                  <span className="text-[#007BFF] text-sm">₹{tempSalaryRange[0]} - ₹{tempSalaryRange[1]}+</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={tempSalaryRange[1]}
                  onChange={(e) => setTempSalaryRange([tempSalaryRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-[#0A0F1C] rounded-lg appearance-none cursor-pointer accent-[#007BFF]"
                />
              </div>

              {/* Experience Level */}
              <div className="mb-5">
                <h4 className="text-gray-400 text-sm mb-2">Experience Level</h4>
                <div className="flex flex-wrap gap-2">
                  {experiences.map(exp => (
                    <button
                      key={exp}
                      onClick={() => toggleTempFilter(tempExperienceLevel, setTempExperienceLevel, exp)}
                      className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                        tempExperienceLevel.includes(exp)
                          ? 'bg-[#007BFF] border-[#007BFF] text-white shadow-lg shadow-blue-500/30'
                          : 'bg-[#0A0F1C] border-[#1f2937] text-gray-400 hover:border-[#007BFF]'
                      }`}
                    >
                      {exp}
                    </button>
                  ))}
                </div>
              </div>

              {/* Apply Button */}
              <button
                onClick={applyFilters}
                className="w-full bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white py-3 rounded-xl hover:shadow-xl hover:shadow-blue-500/20 transition-all"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Jobs List */}
        <div className="px-5 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg flex items-center gap-2 relative">
              <span className="text-2xl">🔥</span>
              <span>Available Jobs ({displayedJobs.length})</span>
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#007BFF] via-purple-500 to-transparent rounded-full"></span>
            </h2>
          </div>
          
          {displayedJobs.length > 0 ? (
            <div className="space-y-3">
              {displayedJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => onJobClick(job)}
                  className="bg-gradient-to-r from-[#0E1628] via-[#111827] to-[#0E1628] rounded-[14px] p-4 border border-[#007BFF]/30 hover:border-[#007BFF] hover:shadow-xl hover:shadow-blue-500/10 transition-all cursor-pointer relative overflow-hidden group transform hover:-translate-y-1"
                  style={{ boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}
                >
                  {job.bookmarked && (
                    <div className="absolute top-2 left-2 z-10">
                      <Bookmark className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    </div>
                  )}
                  {job.hot && (
                    <div className="absolute top-2 right-2 z-10">
                      <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-lg shadow-red-500/50 animate-pulse">
                        🔥 HOT
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-white mb-1 group-hover:text-[#007BFF] transition-colors">{job.title}</h3>
                      <p className="text-[#A1A1AA] text-sm mb-2">{job.company}</p>
                    </div>
                    <span className={`bg-gradient-to-r ${getJobTypeColor(job.type)} text-white text-xs px-2.5 py-1 rounded-md flex-shrink-0 ml-2 shadow-lg ${job.hot ? 'mt-6' : ''}`}>
                      {job.type}
                    </span>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-[#1f2937] to-transparent mb-3"></div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <IndianRupee className="w-4 h-4 text-[#38BDF8]" />
                      <span>{job.salaryRange}</span>
                    </div>
                    <div className="text-[#1f2937]">|</div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-[#38BDF8]" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                    <Clock className="w-3 h-3 text-[#38BDF8]" />
                    <span>{job.time}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#141A2A] rounded-xl p-8 border border-[#1f2937] text-center">
              <p className="text-gray-400 mb-2">No jobs found matching your criteria</p>
              <button
                onClick={clearAllFilters}
                className="text-[#007BFF] text-sm hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
