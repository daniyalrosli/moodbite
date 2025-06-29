# Git Large File Storage (LFS) Setup for Moodbite

## ✅ **Setup Complete**

Git LFS has been successfully initialized for your Moodbite project. Here's what has been configured:

## 📁 **Files Created:**

### 1. `.gitattributes`
This file tells Git LFS which file types to track as large files. It includes:
- **AI/ML Model Files**: `.pkl`, `.joblib`, `.h5`, `.pt`, `.pth`, `.safetensors`
- **Large Data Files**: `.csv`, `.json`, `.parquet`, `.feather`
- **Images and Media**: `.jpg`, `.png`, `.mp4`, `.svg`
- **Hugging Face Models**: `*.bin`, `config.json`, `tokenizer.json`
- **Archives**: `.zip`, `.tar.gz`, `.rar`
- **Database Files**: `.db`, `.sqlite`, `.sqlite3`

### 2. `.gitignore`
Comprehensive ignore file that excludes:
- Build artifacts (`.next/`, `node_modules/`, `__pycache__/`)
- Environment files (`.env`)
- Cache directories
- IDE files (`.vscode/`, `.idea/`)
- OS files (`.DS_Store`)

## 🚀 **How to Use Git LFS:**

### **Adding Large Files:**
```bash
# Add a large model file
git lfs track "*.pkl"
git add model.pkl
git commit -m "Add ML model"

# Add images
git lfs track "*.jpg"
git add images/
git commit -m "Add food images"
```

### **Checking LFS Status:**
```bash
# See what files are tracked by LFS
git lfs ls-files

# See LFS tracking patterns
git lfs track

# Check LFS status
git lfs status
```

### **Pulling LFS Files:**
```bash
# Pull LFS files after cloning
git lfs pull

# Or clone with LFS files
git lfs clone <repository-url>
```

## 🎯 **Benefits for Moodbite:**

1. **AI Models**: Large transformer models can be stored efficiently
2. **Food Images**: High-quality food images won't bloat the repository
3. **Data Files**: Large datasets can be version controlled
4. **Performance**: Faster clones and pulls for team members

## 📋 **Common Commands:**

```bash
# Initialize LFS (already done)
git lfs install

# Track specific file types
git lfs track "*.pkl"
git lfs track "*.jpg"

# Add and commit LFS files
git add .gitattributes
git add large-file.pkl
git commit -m "Add large file with LFS"

# Check what's tracked
git lfs track

# List LFS files
git lfs ls-files
```

## 🔧 **For Team Members:**

When someone clones the repository:
```bash
# Clone with LFS files
git lfs clone <repository-url>

# Or pull LFS files after regular clone
git clone <repository-url>
cd moodbite
git lfs pull
```

## 📊 **Current Status:**

- ✅ Git LFS initialized
- ✅ `.gitattributes` configured
- ✅ `.gitignore` set up
- ✅ Ready to track large files

Your Moodbite project is now ready to handle large files efficiently with Git LFS! 