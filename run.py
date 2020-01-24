"""Pipeline Initialization for HAB-ML on Lab Deployment"""
# Standard dist imports
import argparse
import os

# Third party imports

# Module level constants

def main(train, test):
    cmd = "npm start & cd back-end/ && node server.js --train " \
         + train + " --test " + test
    os.system(cmd)

#Main 
if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--train', help='Path for training data csv file')
    parser.add_argument('--test', help='Path for testing data csv file')
    args = parser.parse_args()

    main(args.train, args.test)
