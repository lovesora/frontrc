#!/bin/bash
cd $1
tar -zxf $2.tar.gz
cd $2
./configure
make
make install

