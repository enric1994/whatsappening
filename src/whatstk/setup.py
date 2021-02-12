"""setup script."""


from setuptools import setup, find_packages
import os
import glob

this_directory = os.path.abspath(os.path.dirname(__file__))
with open(os.path.join(this_directory, 'README.md')) as f:
    long_description = f.read()

with open(os.path.join(this_directory, 'requirements.txt')) as f:
    requirements = f.readlines()

setup(
    name='whatstk',
    version="0.4.0",
    description="Parser and analytics tools for WhatsApp group chats",
    long_description=long_description,
    long_description_content_type='text/markdown',
    url='http://github.com/lucasrodes/whatstk',
    author='Lucas Rodes-Guirao',
    author_email='hi@lcsrg.me',
    license='GPL-v3',
    install_requires=requirements,
    packages=find_packages('.'),
    package_dir={'': '.'},
    py_modules=[os.path.splitext(os.path.basename(path))[0] for path in glob.glob('./*.py')],
    include_package_data=True,
    zip_safe=False,
    classifiers=[
        "Development Status :: 4 - Beta",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3 :: Only",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "License :: OSI Approved :: GNU General Public License v3 (GPLv3)",
        "Operating System :: OS Independent",
    ],
    keywords='whatsapp analysis parser chat',
    project_urls={
        'Documentation': 'https://lcsrg.me/whatstk',
        'Github': 'http://github.com/lucasrodes/whatstk',
        'Bug Tracker': 'https://github.com/lucasrodes/whatstk/issues',
    },
    python_requires='>=3.7',
    entry_points={
        'console_scripts': [
            'whatstk-generate-chat=whatstk.scripts.generate_chats:main',
            'whatstk-to-csv=whatstk.scripts.txt_to_csv:main',
            'whatstk-graph=whatstk.scripts.graph:main'
        ]
    }
)
