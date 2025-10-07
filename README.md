# HR Diagram Interactive Educational Tool

This activity helps students explore an HR (Hertzsprung-Russell) diagram, which shows the relationship between a star's luminosity and temperature. The tool provides both visual and accessible ways to understand stellar classification and evolution.

## Features

- 🌟 Interactive canvas visualization of the HR diagram
- 📊 Filterable views: Main Sequence, Giants, White Dwarfs, and All Stars
- 🎬 **Star Evolution Animation**: Watch how a Sun-like star evolves over billions of years
- 📱 Responsive design for mobile and desktop
- ♿ **Full accessibility support** for all users

## Accessibility Features

This project has been designed with comprehensive accessibility in mind, meeting **WCAG 2.1 Level AA** standards:

### 🔍 **Screen Reader Support**
- Canvas content is fully described with ARIA labels and descriptions
- Alternative data table provides non-visual access to all star information
- Dynamic content changes are announced via ARIA live regions
- Proper heading hierarchy and semantic HTML structure

### ⌨️ **Keyboard Navigation**
- Complete keyboard accessibility - no mouse required
- Tab navigation through all interactive elements
- Enter/Space activation for buttons and controls
- Canvas interaction via keyboard shortcuts
- Visible focus indicators with high contrast outlines

### 🎨 **Visual Accessibility**
- High contrast mode support for users with visual impairments
- Color information is supplemented with text descriptions
- Respects user's motion preferences (reduced motion support)
- Scalable text and interface elements
- Sufficient color contrast ratios throughout

### 📊 **Alternative Content**
- **Data Table Alternative**: Complete sortable and filterable table of all star data
- **Text Descriptions**: Detailed descriptions of visual content
- **Color Legends**: Text-based alternatives to color-only information
- **Screen Reader Announcements**: Real-time updates for dynamic content

### 🎯 **Interaction Methods**
- **Mouse/Touch**: Click and tap interactions for filtering and evolution animation
- **Keyboard**: Full keyboard navigation and shortcuts
  - **Tab/Shift+Tab**: Navigate between controls
  - **Enter/Space**: Activate buttons and start animations
  - **Evolution Animation**: Accessible via keyboard with full screen reader support
- **Screen Readers**: Compatible with NVDA, JAWS, VoiceOver, and others
- **Voice Control**: Works with voice control software

## File Structure

```
hr-diagram/
├── index.html              # Main accessible version (modular with external files)
├── index-original.html     # Original version (kept as reference)
├── styles.css              # External CSS styles
├── script.js               # External JavaScript functionality
├── README.md               # This documentation
└── scorm_wrapper_template/ # SCORM packaging files
```

> **📝 Note**: The project now uses a clean, streamlined structure:
> - `index.html` - **Primary file**: Complete accessible version with full star evolution animation
> - `index-original.html` - Original version (kept as reference and backup)
> 
> The modular design with external CSS and JavaScript files provides optimal maintainability and performance.

## Getting Started

### Primary Usage
Open `index.html` in a web browser to use the fully accessible version with complete star evolution animation and modular design.

### Reference Version
- **Original**: Open `index-original.html` to see the original working version (kept as reference)

### For Development
The primary `index.html` file uses separated CSS and JavaScript files for:
- Easy code maintenance and updates
- Better version control and collaboration
- Optimal performance and loading
- Clean, organized codebase

## Accessibility Testing

This tool has been designed to work with:

- **Screen Readers**: NVDA, JAWS, VoiceOver, ORCA
- **Browser Accessibility Features**: High contrast mode, zoom
- **Keyboard Navigation**: All major browsers
- **Mobile Screen Readers**: iOS VoiceOver, Android TalkBack

### Testing Checklist
- [ ] Tab through all interactive elements
- [ ] Test with screen reader software
- [ ] Verify in high contrast mode
- [ ] Test keyboard-only navigation
- [ ] Check mobile accessibility
- [ ] Validate color contrast ratios

## Educational Use

### Learning Objectives
Students will be able to:
- Identify different types of stars on the HR diagram
- Understand the relationship between stellar temperature and luminosity
- **Explore stellar evolution**: Watch how stars change over billions of years through the evolution animation
- Classify stars based on their position on the diagram
- **Visualize stellar lifecycles**: See the complete path from main sequence to white dwarf

### Star Evolution Animation
The interactive evolution feature demonstrates:
- **Six Key Phases**: Main sequence → Subgiant → Red Giant → Red Giant Tip → White Dwarf
- **Visual Trail**: Dotted path shows the complete evolutionary journey
- **Time Scale**: Each phase represents billions of years of stellar development
- **Educational Context**: Detailed descriptions explain what happens at each stage
- **Accessible Design**: Screen reader announcements describe each evolutionary step

**Evolution Phases Covered**:
1. **Main Sequence** (Current Sun) - 4.6 billion years
2. **Slightly Evolved Sun** - 8 billion years
3. **Subgiant Phase** - 9 billion years
4. **Red Giant Phase** - 9.5 billion years
5. **Red Giant Tip** - 9.7 billion years
6. **White Dwarf Remnant** - 10+ billion years

### Accessibility in Education
This tool supports inclusive education by:
- Providing multiple ways to access the same information
- Supporting students with diverse learning needs
- Offering both visual and text-based content
- Enabling collaborative learning regardless of abilities

## Technical Implementation

### Accessibility Standards Compliance
- **WCAG 2.1 Level AA** - Web Content Accessibility Guidelines
- **Section 508** - US Federal accessibility requirements
- **ARIA 1.1** - Accessible Rich Internet Applications specifications

### Key Accessibility Technologies Used
- **Semantic HTML5**: Proper document structure and landmarks
- **ARIA Labels & Descriptions**: Enhanced screen reader support
- **Live Regions**: Dynamic content announcements
- **Focus Management**: Proper keyboard navigation flow
- **Alternative Content**: Data tables and text descriptions
- **Responsive Design**: Works across devices and zoom levels

### Browser Compatibility
- Chrome 90+ (recommended for best accessibility support)
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers with screen reader support

## Contributing

When contributing to this project, please ensure:
1. All new features maintain accessibility compliance
2. Test with keyboard navigation and screen readers
3. Provide alternative text for any visual content
4. Follow the established ARIA patterns
5. Update accessibility documentation

## Support

For accessibility-related questions or issues:
- Test the `index-accessible.html` version first
- Check that your browser and assistive technology are up to date
- Refer to the accessibility testing checklist above
- Report issues with specific details about your setup

## License

This educational tool is designed to be freely used and modified for educational purposes while maintaining accessibility standards.

---

**Accessibility Statement**: This tool is committed to providing an accessible experience for all users. If you encounter any accessibility barriers, please let us know so we can continue to improve the experience for everyone.
