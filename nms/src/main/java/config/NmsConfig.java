package config;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.URL;
import java.util.Properties;

public class NmsConfig extends Properties{

	private static final long serialVersionUID = 1L;
	String filepath = "";

	public NmsConfig() {
		super();
		// TODO Auto-generated constructor stub
		
		ClassLoader cl;
		cl = Thread.currentThread().getContextClassLoader();
		if (cl == null)
			cl = ClassLoader.getSystemClassLoader();
		URL url = cl.getResource("eninms.properties");
		
		if (url == null)
			System.out.println("null");
		else {
			filepath = url.getFile();
			System.out.println("path :" + filepath);
		}
		
		try {
			load(new InputStreamReader(new FileInputStream(filepath)));
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	public NmsConfig(int initialCapacity) {
		super(initialCapacity);
		// TODO Auto-generated constructor stub
	}

	public NmsConfig(Properties defaults) {
		super(defaults);
		// TODO Auto-generated constructor stub
	}
	
	public void saveProperties() throws IOException {
		OutputStream os = new FileOutputStream(filepath);
		store(os, null);
	}
}
