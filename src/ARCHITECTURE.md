# CV Builder Pro - Technical Architecture

Complete technical documentation for the CV Builder application.

## System Overview

CV Builder Pro is a client-side SPA (Single Page Application) built with React, TypeScript, and modern web technologies. All data is stored locally in the browser using localStorage with no backend dependencies.

## Technology Stack

### Core Framework
- **React 18.3**: UI library with hooks and functional components
- **TypeScript 5.6**: Type-safe development with strict mode enabled
- **Vite 6.0**: Build tool and dev server with HMR

### Styling
- **Tailwind CSS 4.0**: Utility-first CSS framework
- **CSS Custom Properties**: For theme customization

### State Management
- **Zustand**: Lightweight state management with middleware support
- **Zustand Persist**: localStorage persistence middleware

### Export & Print
- **html2canvas**: Convert DOM to canvas for export
- **jsPDF**: Generate PDF documents from canvas

### UI Components
- **Lucide React**: Icon library (tree-shakeable)
- **Custom Components**: Purpose-built UI components

## Architecture Patterns

### Component Architecture

```
┌─────────────────────────────────────┐
│           App.tsx (Root)            │
│  - Layout orchestration             │
│  - Dark mode management             │
│  - Keyboard shortcuts               │
└─────────────────────────────────────┘
              │
      ┌───────┴────────┐
      │                │
┌─────▼─────┐    ┌────▼──────┐
│  Sidebar  │    │   Main    │
│ Component │    │  Content  │
└─────┬─────┘    └────┬──────┘
      │               │
      │         ┌─────┴──────┐
      │         │            │
      │    ┌────▼────┐  ┌───▼──────┐
      │    │ Forms   │  │ Preview  │
      │    │ Section │  │ Section  │
      │    └─────────┘  └──────────┘
      │
┌─────┴──────────────────────┐
│ - ProfileManager           │
│ - TemplateSelector         │
│ - ExportButtons            │
└────────────────────────────┘
```

### Data Flow

```
User Input → Form Component → Zustand Store → localStorage
                                    │
                                    ▼
                            Template Component
                                    │
                                    ▼
                              Live Preview
                                    │
                                    ▼
                           Export (PDF/PNG/Print)
```

## Directory Structure

```
src/
├── types/                  # TypeScript type definitions
│   └── cv.types.ts        # All CV-related interfaces
│
├── stores/                # State management
│   └── useCVStore.ts      # Zustand store with persistence
│
├── components/            # React components
│   ├── ErrorBoundary.tsx  # Error handling wrapper
│   ├── ExportButtons.tsx  # Export functionality UI
│   ├── LoadingSpinner.tsx # Loading state component
│   ├── PhotoUploader.tsx  # Photo upload with preview
│   ├── ProfileManager.tsx # Profile CRUD operations
│   ├── SectionForms.tsx   # Tabbed form sections
│   ├── TemplatePreview.tsx# Template rendering container
│   └── TemplateSelector.tsx# Template selection UI
│
├── templates/             # CV template components
│   ├── ClassicTemplate.tsx    # ATS-friendly template
│   ├── ModernTemplate.tsx     # Modern card-based
│   ├── CreativeTemplate.tsx   # Gradient sidebar
│   ├── MinimalTemplate.tsx    # Minimalist design
│   └── ExecutiveTemplate.tsx  # Premium 2-column
│
├── hooks/                 # Custom React hooks
│   └── useCVExport.ts     # Export functionality
│
├── utils/                 # Utility functions
│   └── sample-data.ts     # Sample CV data
│
├── styles/               # Global styles
│   └── globals.css       # Tailwind + custom CSS
│
├── App.tsx               # Main app component
├── main.tsx              # Entry point
└── vite-env.d.ts         # Vite type definitions
```

## Type System

### Core Types

```typescript
// Profile management
interface CVProfile {
  id: string;              // Unique identifier
  name: string;            // Profile display name
  data: CVData;            // All CV content
  createdAt: string;       // ISO timestamp
  updatedAt: string;       // ISO timestamp
}

// Complete CV data structure
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

// Application state
interface AppState {
  profiles: Record<string, CVProfile>;
  activeProfileId: string | null;
  activeTemplate: TemplateType;
  darkMode: boolean;
}
```

### Type Safety

- **100% TypeScript**: No `any` types used (except where necessary in forms)
- **Strict Mode**: Enabled for maximum type safety
- **Interface-First**: All data structures defined before implementation
- **Type Guards**: Used for runtime type checking where needed

## State Management

### Zustand Store

```typescript
// Store structure
{
  // State
  profiles: Record<string, CVProfile>
  activeProfileId: string | null
  activeTemplate: TemplateType
  darkMode: boolean
  
  // Actions
  createProfile(name: string): void
  deleteProfile(id: string): void
  duplicateProfile(id: string): void
  setActiveProfile(id: string): void
  updateProfileName(id: string, name: string): void
  updateProfileData(id: string, data: Partial<CVData>): void
  setActiveTemplate(template: TemplateType): void
  toggleDarkMode(): void
  
  // Helpers
  getActiveProfile(): CVProfile | null
}
```

### Persistence Strategy

- **Storage**: localStorage
- **Key**: `cv-builder-storage`
- **Auto-save**: Every state change
- **Serialization**: Automatic via Zustand persist middleware
- **Migration**: Version-based (future enhancement)

## Component Design

### Composition Pattern

Components follow a composition-over-inheritance pattern:

```typescript
// Container components manage state
<SectionForms>
  <PersonalForm />
  <EducationForm />
  <ExperienceForm />
  // ... more forms
</SectionForms>

// Presentational components receive props
<Template data={cvData} />
```

### Props Interface Pattern

```typescript
interface ComponentProps {
  // Required props (no optional marker)
  data: CVData;
  onChange: (data: CVData) => void;
  
  // Optional props
  className?: string;
  
  // Callbacks with descriptive names
  onSave?: () => void;
  onCancel?: () => void;
}
```

## Performance Optimizations

### React Performance

1. **Memoization**: Strategic use of `React.memo` for expensive components
2. **Callback Optimization**: `useCallback` for event handlers
3. **Effect Optimization**: Minimal dependencies in `useEffect`
4. **Lazy Loading**: Dynamic imports for templates (future enhancement)

### Rendering Optimization

1. **Virtual Scrolling**: Not needed (reasonable data sizes)
2. **Debouncing**: Input changes debounced for preview updates
3. **Key Props**: Unique keys for list items using IDs
4. **Conditional Rendering**: Early returns for loading states

### Storage Optimization

1. **Photo Compression**: Images resized to 400x500px
2. **Base64 Encoding**: Efficient for small images
3. **Lazy Persistence**: Write to localStorage only on changes
4. **Data Compression**: (future enhancement)

## Export System

### PDF Generation

```typescript
// Process flow
1. Get preview element from DOM
2. Remove CSS transforms for export
3. Render to canvas with html2canvas
4. Convert canvas to image
5. Create PDF with jsPDF
6. Restore original styles
7. Trigger download
```

### PNG Generation

```typescript
// Process flow
1. Get preview element from DOM
2. Remove CSS transforms
3. Render to canvas at 2x scale
4. Convert to PNG blob
5. Create download link
6. Restore original styles
```

### Print Optimization

```typescript
// Process flow
1. Clone template element
2. Open new window
3. Inject styles and content
4. Trigger native print dialog
5. Close window after print
```

## Template System

### Template Interface

All templates implement the same interface:

```typescript
interface TemplateProps {
  data: CVData;
}

const Template: React.FC<TemplateProps> = ({ data }) => {
  // Render CV with template-specific styling
  return <div>...</div>;
}
```

### Template Characteristics

- **Self-contained**: Each template is independent
- **Responsive**: Mobile-first design (where appropriate)
- **Print-ready**: A4 format (210mm × 297mm)
- **ATS-friendly**: Especially Classic template
- **Accessible**: Semantic HTML, proper contrast

## Error Handling

### Error Boundary

```typescript
// Catches React component errors
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### Try-Catch Blocks

- Export operations wrapped in try-catch
- User-friendly error messages
- Console logging for debugging

### Validation

- Form validation (future enhancement with Zod)
- Type checking at compile time
- Runtime checks for user inputs

## Accessibility

### WCAG 2.1 AA Compliance

1. **Keyboard Navigation**: All interactive elements accessible
2. **Screen Readers**: Semantic HTML, ARIA labels
3. **Color Contrast**: Meets AA standards
4. **Focus Indicators**: Visible focus states
5. **Alt Text**: All images have descriptions

### Keyboard Shortcuts

- `Ctrl+S`: Save (auto-save)
- `Ctrl+E`: Export PDF
- `Ctrl+P`: Print
- `Escape`: Cancel operations

## Security Considerations

### Data Privacy

- **Local-only**: No data sent to servers
- **No tracking**: No analytics or tracking scripts
- **Safe storage**: localStorage isolated per domain
- **XSS Prevention**: React's built-in escaping

### Best Practices

- Content Security Policy headers (deployment)
- HTTPS only (production)
- Regular dependency updates
- No eval() or dangerous innerHTML

## Testing Strategy (Future)

### Unit Tests
- Component rendering
- State management logic
- Utility functions

### Integration Tests
- Form submission flows
- Export functionality
- Profile management

### E2E Tests
- Complete user workflows
- Cross-browser testing
- Export verification

## Build & Deployment

### Build Process

```bash
# Development
vite dev → TypeScript → React Fast Refresh → Browser

# Production
vite build → TypeScript → Rollup → Optimized Bundle
```

### Build Optimizations

- **Code Splitting**: Automatic chunk splitting
- **Tree Shaking**: Remove unused code
- **Minification**: Terser for JS, Lightning CSS for styles
- **Asset Optimization**: Images, fonts optimized

### Deployment Targets

- **Static Hosting**: Vercel, Netlify, GitHub Pages
- **CDN**: Cloudflare, AWS CloudFront
- **Self-hosted**: Any web server (nginx, Apache)

## Future Enhancements

### Planned Features

1. **Backend Integration**: Optional cloud sync
2. **AI Suggestions**: Content improvement recommendations
3. **More Templates**: Additional professional designs
4. **Custom Themes**: User-defined color schemes
5. **Collaboration**: Share and collaborate on CVs
6. **Multi-language**: i18n support
7. **Advanced Export**: DOCX format support
8. **Analytics**: Optional usage analytics

### Technical Improvements

1. **Service Worker**: Offline functionality
2. **IndexedDB**: Better storage for large profiles
3. **Web Workers**: Background processing for exports
4. **Virtual DOM Optimization**: Further performance gains
5. **Automated Testing**: Full test coverage
6. **CI/CD Pipeline**: Automated deployment

## Contributing Guidelines

### Code Style

- **TypeScript**: Strict mode, no any
- **Components**: Functional components with hooks
- **Formatting**: Prettier with configuration
- **Linting**: ESLint with TypeScript rules

### Commit Messages

```
feat: Add new template
fix: Resolve PDF export issue
docs: Update README
refactor: Improve state management
test: Add component tests
```

### Pull Request Process

1. Fork repository
2. Create feature branch
3. Write code with tests
4. Update documentation
5. Submit PR with description

---

**Last Updated**: January 2026
**Version**: 1.0.0
**Maintainer**: CV Builder Pro Team
