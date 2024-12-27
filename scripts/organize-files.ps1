# Move theme files
Move-Item -Path "C:/Users/mrmiz/CascadeProjects/premium-theme/themes/base/*" -Destination "C:/Users/mrmiz/CascadeProjects/aurora-theme-project/src/themes/base/"
Move-Item -Path "C:/Users/mrmiz/CascadeProjects/premium-theme/themes/vscode/*" -Destination "C:/Users/mrmiz/CascadeProjects/aurora-theme-project/src/themes/vscode/"
Move-Item -Path "C:/Users/mrmiz/CascadeProjects/premium-theme/themes/jetbrains/*" -Destination "C:/Users/mrmiz/CascadeProjects/aurora-theme-project/src/themes/jetbrains/"
Move-Item -Path "C:/Users/mrmiz/CascadeProjects/premium-theme/themes/terminal/*" -Destination "C:/Users/mrmiz/CascadeProjects/aurora-theme-project/src/themes/terminal/"

# Move marketing files
Move-Item -Path "C:/Users/mrmiz/CascadeProjects/premium-theme/marketing/*" -Destination "C:/Users/mrmiz/CascadeProjects/aurora-theme-project/marketing/"

# Move documentation
Move-Item -Path "C:/Users/mrmiz/CascadeProjects/premium-theme/docs/*" -Destination "C:/Users/mrmiz/CascadeProjects/aurora-theme-project/docs/"

# Move scripts
Move-Item -Path "C:/Users/mrmiz/CascadeProjects/premium-theme/scripts/*" -Destination "C:/Users/mrmiz/CascadeProjects/aurora-theme-project/scripts/"

# Move package.json and README
Move-Item -Path "C:/Users/mrmiz/CascadeProjects/premium-theme/package.json" -Destination "C:/Users/mrmiz/CascadeProjects/aurora-theme-project/"
Move-Item -Path "C:/Users/mrmiz/CascadeProjects/premium-theme/README.md" -Destination "C:/Users/mrmiz/CascadeProjects/aurora-theme-project/"
