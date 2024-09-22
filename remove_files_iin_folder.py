import os
import shutil

def clean_folder(folder_path):
    # Check if the folder exists
    if os.path.exists(folder_path):
        # Iterate over all files and directories in the folder
        for filename in os.listdir(folder_path):
            file_path = os.path.join(folder_path, filename)
            try:
                # Check if it is a file or directory
                if os.path.isfile(file_path) or os.path.islink(file_path):
                    os.unlink(file_path)  # Remove the file or link
                elif os.path.isdir(file_path):
                    shutil.rmtree(file_path)  # Remove the directory
            except Exception as e:
                print(f'Failed to delete {file_path}. Reason: {e}')
    else:
        # If the folder doesn't exist, create it
        os.makedirs(folder_path)
        print(f'Folder created at {folder_path}')

# Example usage:
folder_to_clean = 'Outputs/html_dumps'

# Clean the folder
clean_folder(folder_to_clean)

# Now you can proceed with your file processing code
print("Folder cleaned. Proceeding with file processing...")