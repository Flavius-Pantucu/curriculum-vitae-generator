# CV Builder Pro

A complete, production-ready TypeScript single-page web application for generating custom CVs/resumes with multiple professional templates.

## Features

### Core Functionality
- **Multiple Profiles**: Create, edit, save, switch, delete, and duplicate CV profiles
- **Photo Upload**: Drag-drop or file picker with automatic resize and crop functionality
- **8 Comprehensive Sections**: Personal info, Experience, Education, Skills, Projects, Certifications, Languages, and Hobbies
- **5 Professional Templates**: 
  - Classic (ATS-friendly, minimal design)
  - Modern (color accents, clean cards)
  - Creative (gradient sidebar, icons)
  - Minimal (single column, spacious)
  - Executive (2-column, premium typography)

### Advanced Features
- **Live Preview**: Real-time preview with photo rendering
- **Multiple Export Formats**: PDF (A4/Letter), PNG, and Print-optimized
- **Dark Mode**: System preference detection with manual toggle
- **Keyboard Shortcuts**: 
  - `Ctrl+S` - Save (auto-save enabled)
  - `Ctrl+E` - Export PDF
  - `Ctrl+P` - Print
- **Data Persistence**: All data stored in localStorage with auto-save
- **Responsive Design**: Mobile-first, fully responsive layout
- **TypeScript**: 100% type-safe with no `any` types

## Tech Stack

- **React 18.3** with TypeScript 5.6
- **Vite 6.0** for blazing-fast development
- **Tailwind CSS 4.0** for styling
- **Zustand** for state management with persistence
- **html2canvas + jsPDF** for PDF generation
- **Lucide React** for icons

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Project Structure

```
cv-builder-pro/
├── src/
│   ├── types/              # TypeScript type definitions
│   │   └── cv.types.ts
│   ├── stores/             # Zustand state management
│   │   └── useCVStore.ts
│   ├── components/         # React components
│   │   ├── PhotoUploader.tsx
│   │   ├── ProfileManager.tsx
│   │   ├── TemplateSelector.tsx
│   │   ├── SectionForms.tsx
│   │   ├── TemplatePreview.tsx
│   │   └── ExportButtons.tsx
│   ├── templates/          # CV templates
│   │   ├── ClassicTemplate.tsx
│   │   ├── ModernTemplate.tsx
│   │   ├── CreativeTemplate.tsx
│   │   ├── MinimalTemplate.tsx
│   │   └── ExecutiveTemplate.tsx
│   ├── hooks/              # Custom React hooks
│   │   └── useCVExport.ts
│   ├── utils/              # Utility functions
│   │   └── sample-data.ts
│   ├── styles/             # Global styles
│   │   └── globals.css
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Application entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Usage

1. **Create a Profile**: Click the "+" button in the sidebar to create a new CV profile
2. **Fill in Your Information**: Use the tabbed forms to enter your personal details, experience, education, etc.
3. **Upload Photo**: Drag and drop or click to upload your profile photo
4. **Choose a Template**: Select from 5 professional templates in the sidebar
5. **Preview in Real-time**: See your CV update live as you type
6. **Export**: Use the export buttons to download as PDF, PNG, or print directly

## Data Structure

All CV data follows strict TypeScript interfaces:

```typescript
interface CVProfile {
  id: string;
  name: string;
  data: CVData;
  createdAt: string;
  updatedAt: string;
}

interface CVData {
  personal: PersonalData;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
  hobbies: HobbyItem[];
}
```

## Features in Detail

### Photo Upload
- Supports drag-and-drop and file picker
- Automatically resizes to 400x500px
- Stores as base64 in localStorage
- Preview and remove functionality

### Template System
Each template is a separate React component that receives the CV data and renders it with unique styling. Templates are designed to be:
- ATS-friendly (especially Classic template)
- Print-optimized (A4 format)
- Professionally designed
- Fully responsive

### Export System
- **PDF Export**: Uses html2canvas to render the CV as an image, then jsPDF to create a PDF
- **PNG Export**: High-quality image export at 2x resolution
- **Print**: Opens a print-optimized view in a new window

### State Management
Uses Zustand with localStorage persistence middleware for:
- Profile management (CRUD operations)
- Template selection
- Dark mode preference
- Auto-save functionality

## Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- High contrast support in dark mode

## Performance

- Lazy loading for templates
- Optimized re-renders with React hooks
- Efficient state updates with Zustand
- Debounced input handling

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Contributing

This is a complete, production-ready application. Feel free to fork and customize for your needs.

## License

MIT License - feel free to use for personal or commercial projects.

## Sample Data

The application comes pre-loaded with sample data for a "Software Engineer Profile" to help you get started quickly.

## Future Enhancements

Potential features for future versions:
- Cloud sync with backend integration
- Collaborative editing
- More templates
- AI-powered content suggestions
- Multi-language support
- Custom color themes
- Section reordering via drag-and-drop

---

Built with ❤️ using React, TypeScript, and modern web technologies.
