# JC Training

Local iPhone training app built with SwiftUI + SwiftData.

## Product direction
- Strong-style strength logging
- Unlimited workout templates
- Previous-session weight/reps shown inline
- Numeric text entry for weight and reps
- Rest timer
- Exercise library
- Local-only storage
- CSV template import/export (next milestone)
- Strength + cycling/spinning/MTB + padel history (next milestone)

## Technical direction
The app is being built as an original SwiftUI/SwiftData implementation. We are using public product ideas and architectural patterns from strength-training apps, including the public `GunnarStrandbergAB/strength_tracker` repository, but we are not copying source code from that repository because its README currently labels the project as private.

Apple Watch code is intentionally excluded from JC Training.

## Requirements
- iOS 17+
- Xcode 15+
- Swift 5.9+

## Development
The project uses XcodeGen.

```bash
brew install xcodegen
xcodegen generate
open JCTraining.xcodeproj
```
