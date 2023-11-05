package com.example.tianling.config;

import com.aliyun.dysmsapi20170525.Client;
import com.aliyun.teaopenapi.models.Config;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ALiYunSMSConfig {
    private String accessKeyId = "LTAI5t9118KcyAVUFb64SXDq";
    private String accessKeySecret = "smlzwNIIijtMQQVYgkxgyTLXxd7pAx";

    public Client createClient() throws Exception {
        Config config = new Config()
                .setAccessKeyId(this.accessKeyId)
                .setAccessKeySecret(this.accessKeySecret);
        config.endpoint = "dysmsapi.aliyuncs.com";
        return new Client(config);
    }
}
