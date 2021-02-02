# Setup the environment

Follow the installations instructions to set up the environment, then come back here and continue reading :blush:
Install these :arrow_down:

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [nodejs](https://nodejs.org/en/download/current/)
- [yarn package manager](https://legacy.yarnpkg.com/en/docs/install/)
- [how to enable SSH on windows 10](https://www.howtogeek.com/336775/how-to-enable-and-use-windows-10s-built-in-ssh-commands/)
- [GPG full suite](https://gpg4win.org/download.html)
- [Draw.io](https://github.com/jgraph/drawio-desktop/releases/tag/v13.0.3)

Any text editor will do for writing markdown, one of the most versatile is [Visual Code](https://code.visualstudio.com) with these plugins:

- [Markdown All In One Plugin](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
- [Markdown Mermaid preview for the diagrams](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid)
- [Emoji](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-emoji)
- [Grammarly](https://marketplace.visualstudio.com/items?itemName=znck.grammarly)

Lets verify your installation. Copy line by line from the following snippet. If there are errors please consult installation instructions.

```bash
git --version
# git version 2.25.0
node --version
# v13.7.0
```

## SSH and committing

We must have SSH keys in order to commit anything to the GitLab servers. They are our keys to the server with max security. If you have them go [here](https://gitlab.com/profile/keys) and add them to GitLab. Name them meaningfully, like `My main laptop key`.

Now you should be fine with committing to the repo via SSH, congrats :clap: :clap: :clap: !!!

## Signing Your Work

We require that every commit is signed with the PGP key.

Comprehensive guide is available on [official git pages](https://git-scm.com/book/en/v2/Git-Tools-Signing-Your-Work)

## Rust Developer Environment on Windows

If you are on Windows you have 2 choices, its recommended to set up both WSL and windows.

1. Download and install "Build Tools for Visual Studio:"

   - You can get it at this link: https://aka.ms/buildtools or you can install it via npm https://www.npmjs.com/package/windows-build-tools/v/2.0.0
   - Run the installation file: `vs_buildtools.exe`.
   - Ensure the "Windows 10 SDK" component is included when installing the Visual C++ Build Tools.
   - Restart your computer.

2. Install Rust:
   1. [install Rust](https://www.rust-lang.org/tools/install)
   2. download the `rustup-init.exe` for both _32-bit_ and _64-bit_ and run it
   3. use WSL, in that case it depends which distribution you have, but generally you can just paste this in your bash `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`
3. Prepare WASM Environment by running this script: `.\scripts\init.bat`
4. Install LLVM: https://releases.llvm.org/download.html
5. Install OpenSSL with `vcpkg`:

   ```bash
   mkdir C:\Tools
   cd C:\Tools
   git clone https://github.com/Microsoft/vcpkg.git
   cd vcpkg
   .\bootstrap-vcpkg.bat
   .\vcpkg.exe install openssl:x64-windows-static
   ```

6. Add OpenSSL to your System Variables using PowerShell:

   ```powershell
   $env:OPENSSL_DIR = 'C:\Tools\vcpkg\installed\x64-windows-static'
   $env:OPENSSL_STATIC = 'Yes'
   [System.Environment]::SetEnvironmentVariable('OPENSSL_DIR', $env:OPENSSL_DIR, [System.EnvironmentVariableTarget]::User)
   [System.Environment]::SetEnvironmentVariable('OPENSSL_STATIC', $env:OPENSSL_STATIC, [System.EnvironmentVariableTarget]::User)
   ```

7. Finally, install `cmake`: https://cmake.org/download/

## Rust Developer Environment

### Debian and its flavors

Run:

```bash
sudo apt install -y cmake pkg-config libssl-dev git gcc build-essential clang libclang-dev
```

### MacOS

Install the [Homebrew package manager](https://brew.sh/), then run:

```bash
brew install openssl cmake llvm
```

Sensio uses the Rust programming language. You should
[install Rust](https://www.rust-lang.org/tools/install) using `rustup`:

Linux based:

```
curl https://sh.rustup.rs -sSf | sh
```

Then you can run `init.sh` script located in `scripts` directory like this:

Linux: `./scripts/init.sh`

This will do following:

1. It will make sure that you are using the latest Rust stable by default
2. It will install and prepare the environment for the Wasm Compilation

### Wasm Compilation

Substrate uses WebAssembly (Wasm), and you will need to configure your Rust compiler to use
`nightly` to support this build target.

This will be prepared when you execute the `init` script.

### Rustup Update

Sensio always uses the latest version of Rust stable and nightly for compilation. To ensure your
Rust compiler is always up to date, you should run:

```
rustup update
```

This may even solve compilation issues you face when working with Sensio.

### Notes pgp move

```sh
touch .gnupg/gpg-agent.conf
echo 'pinentry-program "/mnt/c/Program Files (x86)/GnuPG/bin/pinentry-basic.exe"' > .gnupg/gpg-agent.conf
gpgconf --kill gpg-agent


git config --global gpg.program gpg2
echo "test" | gpg2 --clearsign

```
