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

## Base
Architecture and selected concepts are derived from the MIT-licensed `GunnarStrandbergAB/strength_tracker` project (HellBentIron). Apple Watch code is intentionally excluded from this app.

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
